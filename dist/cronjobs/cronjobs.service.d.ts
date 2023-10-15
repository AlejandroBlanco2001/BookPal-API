import { LoanService } from '../loan/loan.service';
import { FineService } from 'src/fine/fine.service';
export declare class CronjobsService {
    private loanService;
    private fineService;
    constructor(loanService: LoanService, fineService: FineService);
    updateLoanStatus(): void;
    updateFineAmountToPay(): void;
}
