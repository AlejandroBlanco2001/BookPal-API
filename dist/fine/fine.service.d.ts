import { Fine, Prisma } from '@prisma/client';
import { LoanService } from '../loan/loan.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class FineService {
    private loanService;
    private prisma;
    constructor(loanService: LoanService, prisma: PrismaService);
    fine(data: Prisma.FineCreateInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }>;
    getFine(data: Prisma.FineWhereUniqueInput): Promise<Fine | null>;
    getFinesByUserID(data: Prisma.FineWhereInput, user_id: number): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }[]>;
    updateFine(params: {
        where: Prisma.FineWhereUniqueInput;
        data: Prisma.FineUpdateInput;
    }): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }>;
    updateFineAmountToPay(): Promise<void>;
}
