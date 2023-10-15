import { Prisma, Loan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FineService } from 'src/fine/fine.service';
export declare class LoanService {
    private fineService;
    private prisma;
    constructor(fineService: FineService, prisma: PrismaService);
    loan(loanWhereUniqueInput: Prisma.LoanWhereUniqueInput): Promise<Loan | null>;
    createLoan(user_id: number, data: Prisma.LoanCreateInput): Promise<Loan>;
    updateLoan(params: {
        where: Prisma.LoanWhereUniqueInput;
        data: Prisma.LoanUpdateInput;
    }): Promise<Loan>;
    updateLoanStatus(): Promise<void>;
}
