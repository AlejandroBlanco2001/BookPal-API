import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma, Loan, FineStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoanStatus } from '@prisma/client';
import { FineService } from '../fine/fine.service';
import { UserUnpaidFines } from '../exceptions/userUnpaidFines.exception';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { GenericError } from '../exceptions/genericError.exception';
import { LoanNotFound } from '../exceptions/loanNotFound.exceptions';
import { InventoryService } from '../inventory/inventory.service';
import { PhysicalBookNotAvailable } from '../exceptions/physicalBookNotAvailable.exception';
import { MaximumLoansPerCollection } from '../exceptions/maximumLoansPerCollection.exception';
import { NotificationService } from '../notification/notification.service';

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
  ): Promise<Loan | null> {
    const loan = await this.prisma.loan.findUnique({
      where: loanWhereUniqueInput,
    });

    if (!loan) {
      throw new LoanNotFound(loanWhereUniqueInput);
    }
    return loan;
  }

  async createLoan(
    user_id: number,
    data: Prisma.LoanCreateInput,
  ): Promise<Loan> {
    try {
      const physicalBook = await this.physicalBookService.physicalBook({
        barcode: data.physical_book.connect?.barcode as string,
      });

      const is_book_available =
        await this.inventoryService.isPhysicalBookAvailable({
          physical_book_serial_number: physicalBook?.serial_number as string,
        });

      if (!is_book_available) {
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
        reference_name: physicalBook?.collection_id.toString(),
      });

      const max_number_of_collection = await this.referenceService.getMaxLoans({
        reference_name: physicalBook?.collection_id.toString(),
      });

      const user_loans = await this.getLoanByUserID({
        user_id: user_id,
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

      inventory!.quantity = inventory!.quantity - 1;
      inventory!.last_update = new Date();

      const notificationDate = new Date(due_date);
      notificationDate.setDate(notificationDate.getDate() - 1);

      await this.notificationService.createNotification({
        message: 'You loan return date is coming soon!',
        title: 'Book Pal',
        next_schedule_date: notificationDate.toString(),
        user: {
          connect: {
            id: user_id,
          },
        },
      });

      data.due_date = new Date(due_date);

      return await this.prisma.loan.create({
        data,
      });
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
      const is_fine_payed = await this.fineService.getFine({
        id: where.id,
      });
      if (is_fine_payed!.status === FineStatus.unpaid) {
        throw new UserUnpaidFines();
      }
      return await this.prisma.loan.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError('LoanService', error.message, 'updateLoan');
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
          id: physicalBook!.reference_id,
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

  async getLoanByUserID(data: Prisma.LoanWhereInput): Promise<Loan[]> {
    try {
      const loans = await this.prisma.loan.findMany({
        where: data,
      });
      return loans;
    } catch (error: any) {
      throw new GenericError('LoanService', error.message, 'getLoanByUserID');
    }
  }
}
