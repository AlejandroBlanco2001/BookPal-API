import { Prisma, Loan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FineService } from '../fine/fine.service';
import { PhyiscalBookWithRatings, PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationService } from '../notification/notification.service';
export interface LoanWithPhysicalBook extends Loan {
    physical_book: PhyiscalBookWithRatings;
    Fine?: any;
}
export declare class LoanService {
    private fineService;
    private physicalBookService;
    private referenceService;
    private inventoryService;
    private notificationService;
    private prisma;
    constructor(fineService: FineService, physicalBookService: PhysicalBookService, referenceService: ReferenceService, inventoryService: InventoryService, notificationService: NotificationService, prisma: PrismaService);
    loan(loanWhereUniqueInput: Prisma.LoanWhereUniqueInput, includes?: any): Promise<LoanWithPhysicalBook | null>;
    createLoan(user_id: number, data: Prisma.LoanCreateInput): Promise<Loan>;
    updateLoan(params: {
        where: Prisma.LoanWhereUniqueInput;
        data: Prisma.LoanUpdateInput;
    }): Promise<Loan>;
    returnLoan(id: number): Promise<Loan>;
    updateLoanStatus(): Promise<void>;
    getLoanByUserID(data: Prisma.LoanWhereInput): Promise<LoanWithPhysicalBook[]>;
}
