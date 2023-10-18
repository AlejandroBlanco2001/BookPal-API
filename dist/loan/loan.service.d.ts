import { Prisma, Loan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FineService } from '../fine/fine.service';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
export declare class LoanService {
    private fineService;
    private physicalBookService;
    private referenceService;
    private prisma;
    constructor(fineService: FineService, physicalBookService: PhysicalBookService, referenceService: ReferenceService, prisma: PrismaService);
    loan(loanWhereUniqueInput: Prisma.LoanWhereUniqueInput): Promise<Loan | null>;
    createLoan(user_id: number, data: Prisma.LoanCreateInput): Promise<Loan>;
    updateLoan(params: {
        where: Prisma.LoanWhereUniqueInput;
        data: Prisma.LoanUpdateInput;
    }): Promise<Loan>;
    updateLoanStatus(): Promise<void>;
}
