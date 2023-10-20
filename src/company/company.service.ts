import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Company, Prisma } from '@prisma/client';
import { CompanyNotFound } from '../exceptions/companyNotFound.exception';
import { GenericError } from 'src/exceptions/genericError.exception';
@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    const { where, data } = params;
    try {
      return await this.prisma.company.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError('CompanyService', error.message, 'updateCompany');
    }
  }

  async company(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: companyWhereUniqueInput,
    });
    if (!company) {
      throw new CompanyNotFound();
    }
    return company;
  }
}
