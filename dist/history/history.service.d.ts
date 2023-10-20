import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class HistoryService {
    private prismaService;
    constructor(prismaService: PrismaService);
    history(): Promise<{
        id: number;
        model_name: string;
        model_id: number;
        action: import(".prisma/client").$Enums.HistoryAction;
        user_id: number;
        date: Date;
        data: string | null;
    }[]>;
    createHistoryPoint(data: Prisma.HistoryCreateInput): Promise<void>;
}
