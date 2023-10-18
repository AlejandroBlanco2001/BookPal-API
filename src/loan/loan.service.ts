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

@Injectable()
export class LoanService {
  constructor(
    @Inject(forwardRef(() => FineService))
    private fineService: FineService,
    private physicalBookService: PhysicalBookService,
    private referenceService: ReferenceService,
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
      const unpaidFines = await this.fineService.getFinesByUserID({
        id: user_id,
        status: FineStatus.unpaid,
      });
      if (unpaidFines.length > 0) {
        throw new UserUnpaidFines();
      }
      return this.prisma.loan.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError('LoanService', error.message, 'createLoan');
    }
  }

  async updateLoan(params: {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.LoanUpdateInput;
  }): Promise<Loan> {
    const { where, data } = params;
    try {
      return this.prisma.loan.update({
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
        if (dueDate < today && loan.status === LoanStatus.active) {
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
}
