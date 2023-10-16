import { LoanService } from '../loan/loan.service';
import { FineService } from 'src/fine/fine.service';
export declare class CronjobsService {
    private loanService;
    private fineService;
    private readonly logger;
    constructor(loanService: LoanService, fineService: FineService);
    updateLoanStatus(): void;
    updateFineAmountToPay(): void;
}
