import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoanService } from '../loan/loan.service';
import { FineService } from 'src/fine/fine.service';
const EVERY_30_MINUTES_BETWEEN_7AM_AND_8PM = '0 */30 7-19 * * *';

@Injectable()
export class CronjobsService {
  constructor(
    private loanService: LoanService,
    private fineService: FineService,
  ) {}
  @Cron(EVERY_30_MINUTES_BETWEEN_7AM_AND_8PM)
  updateLoanStatus() {
    try {
      console.log('Updating loan status...');
      this.loanService.updateLoanStatus();
    } catch (err) {
      console.log(err);
    }
    console.log('Finished updating loan status.');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  updateFineAmountToPay() {
    try {
      console.log('Updating fine amount to pay...');
      this.fineService.updateFineAmountToPay();
    } catch (err) {
      console.log(err);
    }
    console.log('Finished updating fine amount to pay.');
  }
}
