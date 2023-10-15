import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CompanyService } from './company.service';
import { CompanyGuard } from './company.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(CompanyGuard)
  @Put(':id')
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: Prisma.CompanyUpdateInput,
  ) {
    return this.companyService.updateCompany({
      where: { id: id },
      data: updateCompanyDto,
    });
  }

  @Get(':id')
  getCompany(@Param('id') id: number) {
    return this.companyService.company({ id: id });
  }
}
