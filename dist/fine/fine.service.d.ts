import { Prisma } from '@prisma/client';
import { LoanService } from 'src/loan/loan.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class FineService {
    private loanService;
    private prisma;
    constructor(loanService: LoanService, prisma: PrismaService);
    fine(data: Prisma.FineCreateInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date;
    }>;
    getFineByLoanID(data: Prisma.FineWhereUniqueInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date;
    } | null>;
    getFinesByUserID(data: Prisma.FineWhereUniqueInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date;
    }[]>;
    updateFine(params: {
        where: Prisma.FineWhereUniqueInput;
        data: Prisma.FineUpdateInput;
    }): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date;
    }>;
    updateFineAmountToPay(): Promise<void>;
}
