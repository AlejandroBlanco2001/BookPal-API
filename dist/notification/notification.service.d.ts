import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    notifications(): Promise<{
        id: number;
        user_token: string;
        title: string;
        message: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        next_schedule_date: Date;
    }[]>;
    createNotification(data: Prisma.NotificationCreateInput): Promise<void>;
    sendPushNotification({ body, title, token, }: {
        body: string;
        title: string;
        token: string;
    }): Promise<void>;
}
