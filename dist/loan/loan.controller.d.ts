import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { ReferenceService } from 'src/reference/reference.service';
export declare class LoanController {
    readonly loanService: LoanService;
    readonly referenceService: ReferenceService;
    constructor(loanService: LoanService, referenceService: ReferenceService);
    getLoanByID(id: string): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        start_date: Date;
        due_date: Date;
        return_date: Date | null;
        status: import(".prisma/client").$Enums.LoanStatus;
    } | null>;
    createLoan(req: any, createLoanDto: CreateLoanDto): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        start_date: Date;
        due_date: Date;
        return_date: Date | null;
        status: import(".prisma/client").$Enums.LoanStatus;
    }>;
    returnLoan(id: string): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        start_date: Date;
        due_date: Date;
        return_date: Date | null;
        status: import(".prisma/client").$Enums.LoanStatus;
    }>;
}
