import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma, Loan, FineStatus, BookStatus } from '@prisma/client';
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
  ): Promise<LoanWithPhysicalBook | null> {
    const loan = await this.prisma.loan.findUnique({
      where: loanWhereUniqueInput,
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
    user_token: string,
    data: Prisma.LoanCreateInput,
  ): Promise<LoanWithPhysicalBook> {
    try {
      const physicalBook = await this.physicalBookService.physicalBook({
        barcode: data.physical_book.connect?.barcode as string,
      });

      if (physicalBook?.status === BookStatus.unavailable) {
        throw new PhysicalBookNotAvailable(
          data.physical_book.connect?.barcode as string,
        );
      }

      const unpaidFines = await this.fineService.getFinesByUserID(
        {
          status: FineStatus.unpaid,
        },
        user_id,
      );

      if (unpaidFines?.length > 0) {
        throw new UserUnpaidFines();
      }

      const due_date = await this.referenceService.getDueDate({
        id: physicalBook?.collection_id,
      });

      const max_number_of_collection = await this.referenceService.getMaxLoans({
        id: physicalBook?.collection_id,
      });

      const user_loans = await this.getLoanByUserID({
        id: user_id,
      });

      const user_loans_barcode = user_loans.map(
        (loan: Loan) => loan.physical_book_barcode,
      );

      const user_loans_books = await this.physicalBookService.physicalBooks({
        where: {
          serial_number: {
            in: user_loans_barcode,
          },
          collection_id: physicalBook?.collection_id,
        },
      });

      if (user_loans_books?.length > max_number_of_collection) {
        throw new MaximumLoansPerCollection();
      }

      const inventory =
        await this.inventoryService.inventoryByPhyiscalSerialNumber({
          physical_book_serial_number: physicalBook?.serial_number as string,
        });

      if (inventory && physicalBook) {
        await this.inventoryService.updateInventory({
          where: {
            id: inventory.id,
          },
          data: {
            quantity: inventory.quantity - 1,
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

      const notificationDate = new Date(due_date);
      notificationDate.setDate(notificationDate.getDate() - 1);

      await this.notificationService.createNotification({
        message: 'You loan return date is coming soon!',
        title: 'Book Pal',
        next_schedule_date: notificationDate.toISOString(),
        user: {
          connect: {
            phone_token: user_token,
          },
        },
      });

      data.due_date = new Date(due_date);

      const loan = await this.prisma.loan.create({
        data,
      });

      return {
        ...loan,
        physical_book: physicalBook as PhyiscalBookWithRatings,
      };
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
      const loan = await this.loan({ id });
      if (loan && loan.status === LoanStatus.returned) {
        throw new LoanAlreadyReturned();
      }
      const fine = await this.fineService.getFine({
        id: loan!.id,
      });
      if (fine && fine?.status === FineStatus.unpaid) {
        throw new UserUnpaidFines();
      }
      const physicalBook = await this.physicalBookService.physicalBook({
        barcode: loan!.physical_book_barcode,
      });
      const inventory =
        await this.inventoryService.inventoryByPhyiscalSerialNumber({
          physical_book_serial_number: physicalBook!.serial_number,
        });
      if (inventory && physicalBook) {
        await this.inventoryService.updateInventory({
          where: {
            id: inventory.id,
          },
          data: {
            quantity: inventory.quantity + 1,
            last_update: new Date(),
          },
        });
        await this.physicalBookService.updatePhysicalBook({
          where: {
            barcode: physicalBook.barcode,
          },
          data: {
            status: BookStatus.available,
          },
        });
      }
      return await this.updateLoan({
        where: { id },
        data: { status: LoanStatus.returned },
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
      });
      const today = new Date();
      loans.forEach(async (loan) => {
        const dueDate = new Date(loan.due_date);
        const physicalBook = await this.physicalBookService.physicalBook({
          barcode: loan.physical_book_barcode,
        });
        const collection = await this.referenceService.reference({
          id: physicalBook!.collection_id,
        });
        if (dueDate < today) {
          await this.fineService.fine({
            last_update_date: new Date(),
            amount: collection?.amount_of_money_per_day,
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
      });
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
