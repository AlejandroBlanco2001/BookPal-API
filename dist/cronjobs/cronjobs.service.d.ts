import { LoanService } from '../loan/loan.service';
import { NotificationService } from '../notification/notification.service';
import { FineService } from '../fine/fine.service';
import { CompanyService } from '../company/company.service';
export declare class CronjobsService {
    private loanService;
    private fineService;
    private notificationService;
    private companyService;
    private readonly logger;
    constructor(loanService: LoanService, fineService: FineService, notificationService: NotificationService, companyService: CompanyService);
    updateLoanStatus(): Promise<void>;
    updateFineAmountToPay(): Promise<void>;
    sendNotifications(): Promise<void>;
    updateDynamicCode(): Promise<void>;
}
