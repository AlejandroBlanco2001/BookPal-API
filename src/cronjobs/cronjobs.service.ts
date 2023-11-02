import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoanService } from '../loan/loan.service';
import { NotificationService } from '../notification/notification.service';
import { FineService } from '../fine/fine.service';
const EVERY_10_MINUTES_BETWEEN_7AM_AND_8PM = '0 */10 7-19 * * *';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);

  constructor(
    private loanService: LoanService,
    private fineService: FineService,
    private notificationService: NotificationService,
  ) {}
  @Cron(EVERY_10_MINUTES_BETWEEN_7AM_AND_8PM)
  async updateLoanStatus() {
    this.logger.debug('Updating loan status...');
    try {
      await this.loanService.updateLoanStatus();
    } catch (err) {
      console.log(err);
    }
    this.logger.log('Finished updating loan status.');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateFineAmountToPay() {
    this.logger.debug('Updating fine amount to pay...');
    try {
      await this.fineService.updateFineAmountToPay();
    } catch (err) {
      console.log(err);
    }
    this.logger.debug('Finished updating fine amount to pay.');
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async sendNotifications() {
    this.logger.debug('Sending notifications...');
    try {
      const notifications_to_send =
        await this.notificationService.notifications();
      notifications_to_send.forEach(async (notification) => {
        await this.notificationService.sendPushNotification({
          body: notification.message,
          title: notification.title,
          token: notification.user_token,
        });
      });
    } catch (err) {
      console.log(err);
    }
    this.logger.debug('Finished sending notifications.');
  }
}
