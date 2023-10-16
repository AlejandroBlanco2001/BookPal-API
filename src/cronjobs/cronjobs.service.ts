import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoanService } from '../loan/loan.service';
import { FineService } from 'src/fine/fine.service';
const EVERY_30_MINUTES_BETWEEN_7AM_AND_8PM = '0 */30 7-19 * * *';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);

  constructor(
    private loanService: LoanService,
    private fineService: FineService,
  ) {}
  @Cron(EVERY_30_MINUTES_BETWEEN_7AM_AND_8PM)
  updateLoanStatus() {
    this.logger.debug('Updating loan status...');
    try {
      this.loanService.updateLoanStatus();
    } catch (err) {
      console.log(err);
    }
    this.logger.log('Finished updating loan status.');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  updateFineAmountToPay() {
    this.logger.debug('Updating fine amount to pay...');
    try {
      this.fineService.updateFineAmountToPay();
    } catch (err) {
      console.log(err);
    }
    this.logger.debug('Finished updating fine amount to pay.');
  }
}
