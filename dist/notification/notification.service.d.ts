import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    notifications(): Promise<{
        id: number;
        title: string;
        message: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        next_schedule_date: Date;
    }[]>;
    createNotification(data: Prisma.NotificationCreateInput): Promise<{
        id: number;
        title: string;
        message: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        next_schedule_date: Date;
    }>;
    sendPushNotification({ body, title, token, }: {
        body: string;
        title: string;
        token: string;
    }): Promise<void>;
}
