import * as firebase from 'firebase-admin';
import * as path from 'path';

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
  constructor() {}
}
