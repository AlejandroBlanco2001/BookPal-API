import { Prisma, Loan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FineService } from '../fine/fine.service';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationService } from '../notification/notification.service';
export declare class LoanService {
    private fineService;
    private physicalBookService;
    private referenceService;
    private inventoryService;
    private notificationService;
    private prisma;
    constructor(fineService: FineService, physicalBookService: PhysicalBookService, referenceService: ReferenceService, inventoryService: InventoryService, notificationService: NotificationService, prisma: PrismaService);
    loan(loanWhereUniqueInput: Prisma.LoanWhereUniqueInput): Promise<Loan | null>;
    createLoan(user_id: number, user_token: string, data: Prisma.LoanCreateInput): Promise<Loan>;
    updateLoan(params: {
        where: Prisma.LoanWhereUniqueInput;
        data: Prisma.LoanUpdateInput;
    }): Promise<Loan>;
    updateLoanStatus(): Promise<void>;
    (data: Prisma.LoanWhereInput): Promise<Loan[]>;
}
