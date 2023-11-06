import { Prisma } from '@prisma/client';
import { FineService } from 'src/fine/fine.service';
import { LoanService } from 'src/loan/loan.service';
export declare class LibraryService {
    private fineService;
    private loanService;
    constructor(fineService: FineService, loanService: LoanService);
    getFinesByUserID(where: Prisma.FineWhereInput, user_id: number): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }[]>;
    getFine(where: Prisma.FineWhereUniqueInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }>;
    fine(data: Prisma.FineCreateInput): Promise<{
        id: number;
        loan_id: number;
        amount: number;
        status: import(".prisma/client").$Enums.FineStatus;
        pay_date: Date | null;
        last_update_date: Date;
    }>;
    getLoanByUserID(where: Prisma.LoanWhereInput): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        start_date: Date;
        due_date: Date;
        return_date: Date | null;
        status: import(".prisma/client").$Enums.LoanStatus;
    }[]>;
    loan(where: Prisma.LoanWhereUniqueInput): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        start_date: Date;
        due_date: Date;
        return_date: Date | null;
        status: import(".prisma/client").$Enums.LoanStatus;
    } | null>;
}
