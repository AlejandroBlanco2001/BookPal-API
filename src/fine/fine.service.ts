import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Fine, FineStatus, Prisma } from '@prisma/client';
import { LoanService } from '../loan/loan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/constant';
import { GenericError } from '../exceptions/genericError.exception';
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

  async getFine(data: Prisma.FineWhereUniqueInput): Promise<Fine | null> {
    let fine;
    try {
      fine = await this.prisma.fine.findUnique({ where: data });
      if (!fine) {
        return null;
      }
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'getFine');
    }
    return fine;
  }

  async getFines(data: Prisma.FineWhereInput, includes?: any): Promise<Fine[]> {
    let fines: Fine[] = [];
    try {
      fines = await this.prisma.fine.findMany({
        where: data,
        include: includes,
      });
    } catch (error: any) {
      throw new GenericError('FineService', error.message, 'getFines');
    }
    return fines;
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
    const fines = await this.getFines(
      {
        status: FineStatus.unpaid,
        last_update_date: {
          gt: new Date(),
        },
      },
      {
        loan: true,
      },
    );

    for (const fine of fines) {
      const date = new Date();
      const due_date = new Date((fine as any).loan!.due_date);
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
    }
  }
}
