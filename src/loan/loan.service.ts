import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma, Loan, FineStatus, BookStatus, Fine } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoanStatus } from '@prisma/client';
import { FineService } from '../fine/fine.service';
import { UserUnpaidFines } from '../exceptions/userUnpaidFines.exception';
import {
  PhyiscalBookWithRatings,
  PhysicalBookService,
} from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { GenericError } from '../exceptions/genericError.exception';
import { LoanNotFound } from '../exceptions/loanNotFound.exceptions';
import { InventoryService } from '../inventory/inventory.service';
import { PhysicalBookNotAvailable } from '../exceptions/physicalBookNotAvailable.exception';
import { MaximumLoansPerCollection } from '../exceptions/maximumLoansPerCollection.exception';
import { NotificationService } from '../notification/notification.service';
import { LoanAlreadyReturned } from '../exceptions/loanAlreadyReturned.exception';

export interface LoanWithPhysicalBook extends Loan {
  physical_book: PhyiscalBookWithRatings;
  Fine?: any;
}
@Injectable()
export class LoanService {
  constructor(
    @Inject(forwardRef(() => FineService))
    private fineService: FineService,
    private physicalBookService: PhysicalBookService,
    private referenceService: ReferenceService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private prisma: PrismaService,
  ) {}

  async loan(
    loanWhereUniqueInput: Prisma.LoanWhereUniqueInput,
    includes?: any,
  ): Promise<LoanWithPhysicalBook | null> {
    const loan = await this.prisma.loan.findUnique({
      where: loanWhereUniqueInput,
      include: includes,
    });

    if (!loan) {
      throw new LoanNotFound(loanWhereUniqueInput);
    }

    const book = await this.physicalBookService.physicalBook({
      barcode: loan.physical_book_barcode,
    });

    return {
      ...loan,
      physical_book: book,
    } as LoanWithPhysicalBook;
  }

  async createLoan(
    user_id: number,
    data: Prisma.LoanCreateInput,
  ): Promise<Loan> {
    try {
      const physicalBook = await this.physicalBookService.physicalBook(
        {
          barcode: data.physical_book.connect?.barcode as string,
        },
        {
          collection: true,
          Loan: true,
        },
      );

      if (physicalBook?.status === BookStatus.unavailable) {
        throw new PhysicalBookNotAvailable(
          data.physical_book.connect?.barcode as string,
        );
      }

      const unpaidFines = await this.fineService.getFines({
        status: FineStatus.unpaid,
        user_id: user_id,
      });

      if (unpaidFines?.length > 0) {
        throw new UserUnpaidFines();
      }

      const date = new Date();
      date.setDate(
        (date.getDate() +
          (physicalBook as any).collection.amount_of_days_per_loan) as number,
      );

      const maxNumberOfCollection = (physicalBook as any).collection
        .max_number_of_loans;

      const user_loans = await this.getLoanByUserID({
        id: user_id,
      });

      const userAmountOfLoansPerCollection = user_loans.filter((loan) => {
        return loan.physical_book.collection_id === physicalBook?.collection_id;
      }).length;

      if (userAmountOfLoansPerCollection > maxNumberOfCollection) {
        throw new MaximumLoansPerCollection();
      }

      if (physicalBook) {
        await this.inventoryService.updateInventoryGivenSerialNumber({
          where: {
            physical_book_serial_number: physicalBook?.serial_number as string,
          },
          data: {
            quantity: {
              decrement: 1,
            },
            last_update: new Date(),
          },
        });

        await this.physicalBookService.updatePhysicalBook({
          where: {
            barcode: physicalBook.barcode,
          },
          data: {
            status: BookStatus.unavailable,
          },
        });
      }

      const notificationDate = new Date(date);
      notificationDate.setDate(notificationDate.getDate() - 1);

      await this.notificationService.createNotification({
        message: 'You loan return date is coming soon!',
        title: 'Book Pal',
        next_schedule_date: notificationDate.toISOString(),
      });

      data.due_date = new Date(date);

      const loan = await this.prisma.loan.create({
        data,
      });

      return loan;
    } catch (error: any) {
      if (error instanceof GenericError) {
        throw new GenericError('LoanService', error.message, 'createLoan');
      }
      throw error;
    }
  }

  async updateLoan(params: {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.LoanUpdateInput;
  }): Promise<Loan> {
    const { where, data } = params;
    try {
      return await this.prisma.loan.update({
        data,
        where,
      });
    } catch (error: any) {
      if (!(error instanceof UserUnpaidFines)) {
        throw new GenericError('LoanService', error.message, 'updateLoan');
      }
      throw error;
    }
  }

  async returnLoan(id: number): Promise<Loan> {
    try {
      const loan = await this.loan({ id }, { Fine: true, physical_book: true });

      if (loan && loan.status === LoanStatus.returned) {
        throw new LoanAlreadyReturned();
      }

      const isAnyFineUnpaid = loan?.Fine.some((fine: Fine) => {
        return fine.status === FineStatus.unpaid;
      });

      if (isAnyFineUnpaid) {
        throw new UserUnpaidFines();
      }

      if (loan?.physical_book) {
        await this.inventoryService.updateInventoryGivenSerialNumber({
          where: {
            physical_book_serial_number: loan?.physical_book.serial_number,
          },
          data: {
            quantity: {
              increment: 1,
            },
            last_update: new Date(),
          },
        });

        await this.physicalBookService.updatePhysicalBook({
          where: {
            barcode: loan?.physical_book.barcode,
          },
          data: {
            status: BookStatus.available,
          },
        });
      }

      return await this.updateLoan({
        where: { id },
        data: { status: LoanStatus.returned, return_date: new Date() },
      });
    } catch (error: any) {
      if (error instanceof GenericError) {
        throw new GenericError('LoanService', error.message, 'returnLoan');
      }
      throw error;
    }
  }

  async updateLoanStatus(): Promise<void> {
    try {
      const loans = await this.prisma.loan.findMany({
        where: {
          status: LoanStatus.active,
        },
        include: {
          physical_book: {
            include: {
              collection: true,
            },
          },
        },
      });
      const today = new Date();
      for (const loan of loans) {
        const dueDate = new Date(loan.due_date);

        if (dueDate < today) {
          await this.fineService.fine({
            last_update_date: new Date(),
            amount: loan.physical_book.collection?.amount_of_money_per_day,
            user: {
              connect: {
                id: loan.user_id,
              },
            },
            loan: {
              connect: {
                id: loan.id,
              },
            },
            status: FineStatus.unpaid,
          });

          await this.updateLoan({
            where: { id: loan.id },
            data: { status: LoanStatus.overdue },
          });
        }
      }
    } catch (error: any) {
      throw new GenericError('LoanService', error.message, 'updateLoanStatus');
    }
  }

  async getLoanByUserID(
    data: Prisma.LoanWhereInput,
  ): Promise<LoanWithPhysicalBook[]> {
    try {
      const loans = await this.prisma.loan.findMany({
        where: data,
        include: {
          physical_book: true,
        },
        orderBy: {
          start_date: 'desc',
        },
      });
      const loans_book = await Promise.all(
        loans.map(async (loan) => {
          const physicalBook = await this.physicalBookService.physicalBook({
            barcode: loan.physical_book_barcode,
          });
          return {
            ...loan,
            physical_book: physicalBook,
          } as LoanWithPhysicalBook;
        }),
      );
      return loans_book;
    } catch (error: any) {
      throw new GenericError('LoanService', error.message, 'getLoanByUserID');
    }
  }
}
