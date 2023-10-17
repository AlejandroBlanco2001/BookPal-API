import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyGuard } from './company.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDTO } from './dto/update-company-dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(CompanyGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a company' })
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDTO,
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
