import { CompanyService } from './company.service';
import { UpdateCompanyDTO } from './dto/update-company-dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    updateCompany(id: number, updateCompanyDto: UpdateCompanyDTO): Promise<{
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
}
