import { PrismaService } from '../prisma/prisma.service';
import { Company, Prisma } from '@prisma/client';
import { SecurityService } from '../utils/security/security.service';
export declare class CompanyService {
    private prisma;
    private securityService;
    private readonly logger;
    constructor(prisma: PrismaService, securityService: SecurityService);
    updateCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
    }): Promise<Company>;
    company(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null>;
    companies(): Promise<Company[]>;
    updateDynamicCode(): Promise<void>;
}
