import * as firebase from 'firebase-admin';
import * as path from 'path';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

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
  constructor() {
    const firebase = JSON.parse(process.env.FIREBASE_CREDENTIAL_JSON as string);
    firebase.initializeApp({
      credential: firebase.credential.cert(firebase),
    });
  }

  public async sendAll(
    messages: firebase.messaging.TokenMessage[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    if (process.env.NODE_ENV === 'local') {
      for (const { notification, token } of messages) {
        shell.exec(
          `echo '{ "aps": { "alert": ${JSON.stringify(
            notification,
          )}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`,
        );
      }
    }
    return firebase.messaging().sendAll(messages, dryRun);
  }
}
