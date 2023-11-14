import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyGuard } from './company.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDTO } from './dto/update-company-dto';
import { HistoryService } from '../history/history.service';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly historyService: HistoryService,
  ) {}

  @UseGuards(CompanyGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a company' })
  async updateCompany(
    @Request() req: any,
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDTO,
  ) {
    const company = await this.companyService.updateCompany({
      where: { id: id },
      data: updateCompanyDto,
    });
    /* TODO: Uncomment this when the history service is ready
    this.history.createHistoryPoint({
      action: 'update',
      model_name: 'company',
      model_id: company.id,
      user: req.user.id,
      date: new Date(),
      data: JSON.stringify(updateCompanyDto),
    });
    */
    return company;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  async getCompany(@Param('id') id: number) {
    return await this.companyService.company({ id: id });
  }

  @Get('/style/:id')
  @ApiOperation({ summary: 'Get a company style by their ID' })
  async getCompanyStyle(@Param('id') id: number) {
    const company = await this.companyService.company({ id: id });
    if (!company) {
      throw new NotFoundException();
    }
    return {
      logo: company.logo,
      primary_color: company.primary_color,
      secondary_color: company.secondary_color,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  async getCompanies() {
    return await this.companyService.companies();
  }
}
