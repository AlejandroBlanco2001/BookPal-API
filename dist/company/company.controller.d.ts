import { CompanyService } from './company.service';
import { UpdateCompanyDTO } from './dto/update-company-dto';
import { HistoryService } from '../history/history.service';
export declare class CompanyController {
    private readonly companyService;
    private readonly historyService;
    constructor(companyService: CompanyService, historyService: HistoryService);
    updateCompany(req: any, id: number, updateCompanyDto: UpdateCompanyDTO): Promise<{
        id: number;
        name: string;
        book_scan_methods: import(".prisma/client").$Enums.BookScanMethod[];
        logo: string | null;
        primary_color: string | null;
        secondary_color: string | null;
    }>;
    getCompany(id: number): Promise<{
        id: number;
        name: string;
        book_scan_methods: import(".prisma/client").$Enums.BookScanMethod[];
        logo: string | null;
        primary_color: string | null;
        secondary_color: string | null;
    } | null>;
    getCompanyStyle(id: number): Promise<{
        logo: string | null;
        primary_color: string | null;
        secondary_color: string | null;
        book_scan_methods: import(".prisma/client").$Enums.BookScanMethod[];
    }>;
    getCompanies(): Promise<{
        id: number;
        name: string;
        book_scan_methods: import(".prisma/client").$Enums.BookScanMethod[];
        logo: string | null;
        primary_color: string | null;
        secondary_color: string | null;
    }[]>;
}
