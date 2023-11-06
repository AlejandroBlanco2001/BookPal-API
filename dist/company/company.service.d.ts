import { PrismaService } from '../prisma/prisma.service';
import { Company, Prisma } from '@prisma/client';
export declare class CompanyService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    updateCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
    }): Promise<Company>;
    company(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null>;
    companies(): Promise<Company[]>;
}
