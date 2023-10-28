import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Fine, FineStatus, Prisma } from '@prisma/client';
import { LoanService } from '../loan/loan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/constant';
import { GenericError } from '../exceptions/genericError.exception';
import { FineNotFound } from '../exceptions/fineNotFound.exception';
@Injectable()
export class FineService {
  constructor(
    @Inject(forwardRef(() => LoanService))
    private loanService: LoanService,
    private prisma: PrismaService,
  ) {}

  async fine(data: Prisma.FineCreateInput) {
    try {
      return this.prisma.fine.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'fine');
    }
  }

  async getFine(data: Prisma.FineWhereUniqueInput) {
    let fine;
    try {
      fine = await this.prisma.fine.findUnique({ where: data });
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'getFine');
    }
    if (!fine) {
      throw new FineNotFound();
    }
    return fine;
  }

  async getFinesByUserID(data: Prisma.FineWhereInput, user_id: number) {
    let fines: Fine[] = [];
    try {
      const loans_user = await this.loanService.getLoanByUserID({
        user_id,
      });
      const loans_user_id = loans_user.map((loan) => loan.id);
      fines = await this.prisma.fine.findMany({
        where: {
          AND: [
            {
              loan_id: {
                in: loans_user_id,
              },
            },
            data,
          ],
        },
      });
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'getFinesByUserID');
    }
    return fines;
  }

  async updateFine(params: {
    where: Prisma.FineWhereUniqueInput;
    data: Prisma.FineUpdateInput;
  }) {
    const { where, data } = params;
    try {
      return this.prisma.fine.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'updateFine');
    }
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
