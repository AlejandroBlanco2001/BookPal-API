import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma, Loan, FineStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoanStatus } from '@prisma/client';
import { FineService } from '../fine/fine.service';
import { UserUnpaidFines } from '../exceptions/userUnpaidFines.exception';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from 'src/reference/reference.service';

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
    return this.prisma.loan.findUnique({
      where: loanWhereUniqueInput,
    });
  }

  async createLoan(
    user_id: number,
    data: Prisma.LoanCreateInput,
  ): Promise<Loan> {
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
  }

  async updateLoan(params: {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.LoanUpdateInput;
  }): Promise<Loan> {
    const { where, data } = params;
    return this.prisma.loan.update({
      data,
      where,
    });
  }

  async updateLoanStatus(): Promise<void> {
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
  }
}
