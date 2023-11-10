import * as firebase from 'firebase-admin';
import * as path from 'path';
import { GenericError } from '../exceptions/genericError.exception';
import { PrismaService } from '../prisma/prisma.service';
import { Notification } from '@prisma/client';
import { Prisma } from '@prisma/client';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(
      __dirname,
      '..',
      '..',
      'bookpal-91ceb-firebase-adminsdk-yr83d-1af3c3ea22.json',
    ),
  ),
});

export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async notifications() {
    let notifications: Notification[] = [];
    try {
      notifications = await this.prisma.notification.findMany({});
    } catch (error: any) {
      throw new GenericError(
        'NotificationService',
        error.message,
        'notifications',
      );
    }
    return notifications;
  }

  async createNotification(data: Prisma.NotificationCreateInput) {
    try {
      console.log(data);
      this.prisma.notification.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError(
        'NotificationService',
        error.message,
        'createNotification',
      );
    }
  }

  async sendPushNotification({
    body,
    title,
    token,
  }: {
    body: string;
    title: string;
    token: string;
  }): Promise<void> {
    const message = {
      notification: {
        body,
        title,
      },
      data: {},
      token,
    };
    try {
      const response = await firebase.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error: any) {
      throw new GenericError(
        'NotificationService',
        error.message,
        'sendPushNotification',
      );
    }
  }
}
