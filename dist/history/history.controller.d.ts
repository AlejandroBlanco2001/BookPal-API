import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    getHistory(): Promise<{
        id: number;
        model_name: string;
        model_id: number;
        action: import(".prisma/client").$Enums.HistoryAction;
        user_id: number;
        date: Date;
        data: string | null;
    }[]>;
}
