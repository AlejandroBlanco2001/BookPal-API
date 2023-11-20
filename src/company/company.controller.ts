import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyGuard } from './company.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDTO } from './dto/update-company-dto';
import { HistoryService } from '../history/history.service';
import { Public } from '../utils/custom_decorators';
import * as qrcode from 'qrcode';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);
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
  @Public()
  async getCompanyStyle(@Param('id') id: number) {
    const company = await this.companyService.company({ id: id });
    if (!company) {
      throw new NotFoundException();
    }
    return {
      logo: company.logo,
      primary_color: company.primary_color,
      secondary_color: company.secondary_color,
      book_scan_methods: company.book_scan_methods,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  async getCompanies() {
    return await this.companyService.companies();
  }

  @Get('return/code')
  @UseGuards(CompanyGuard)
  @ApiOperation({ summary: 'Return the dynamic code for returns' })
  async getReturnCode(@Request() req: any) {
    const company = await this.companyService.company({
      id: req.user.company_id,
    });
    if (!company) {
      throw new NotFoundException();
    }
    try {
      const qrCodeDataURL = await qrcode.toDataURL(company.dynamic_code_return);
      return `<img src="${qrCodeDataURL}" alt="QR Code" />`;
    } catch (e) {
      this.logger.error(e);
      throw new Error('Failed to generate QR code.');
    }
  }
}
