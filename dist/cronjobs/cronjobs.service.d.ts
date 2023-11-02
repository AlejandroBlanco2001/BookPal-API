import { LoanService } from '../loan/loan.service';
import { NotificationService } from '../notification/notification.service';
import { FineService } from '../fine/fine.service';
export declare class CronjobsService {
    private loanService;
    private fineService;
    private notificationService;
    private readonly logger;
    constructor(loanService: LoanService, fineService: FineService, notificationService: NotificationService);
    updateLoanStatus(): Promise<void>;
    updateFineAmountToPay(): Promise<void>;
    sendNotifications(): Promise<void>;
}
