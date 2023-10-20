import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CompanyGuard } from '../company/company.guard';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all history' })
  @UseGuards(CompanyGuard)
  getHistory() {
    return this.historyService.history();
  }
}
