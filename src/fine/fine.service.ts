import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FineStatus, Prisma } from '@prisma/client';
import { LoanService } from '../loan/loan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/constant';
@Injectable()
export class FineService {
  constructor(
    @Inject(forwardRef(() => LoanService))
    private loanService: LoanService,
    private prisma: PrismaService,
  ) {}

  async fine(data: Prisma.FineCreateInput) {
    return this.prisma.fine.create({
      data,
    });
  }

  async getFineByLoanID(data: Prisma.FineWhereUniqueInput) {
    return this.prisma.fine.findUnique({
      where: data,
    });
  }

  async getFinesByUserID(data: Prisma.FineWhereUniqueInput) {
    return this.prisma.fine.findMany({
      where: data,
    });
  }

  async updateFine(params: {
    where: Prisma.FineWhereUniqueInput;
    data: Prisma.FineUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.fine.update({
      data,
      where,
    });
  }

  async updateFineAmountToPay() {
    const fines = await this.prisma.fine.findMany({
      where: {
        status: FineStatus.unpaid,
        last_update_date: {
          gt: new Date(),
        },
      },
    });
    const date = new Date();
    fines.forEach(async (fine) => {
      const loan = await this.loanService.loan({ id: fine.loan_id });
      const due_date = new Date(loan!.due_date);
      const diffTime = Math.ceil(
        Math.abs(due_date.getTime() - date.getTime()) / ONE_DAY_IN_MILLISECONDS,
      );
      if (diffTime > 0) {
        await this.updateFine({
          where: { id: fine.id },
          data: {
            status: FineStatus.unpaid,
            amount: fine.amount * diffTime,
            last_update_date: new Date(),
          },
        });
      }
    });
  }
}
