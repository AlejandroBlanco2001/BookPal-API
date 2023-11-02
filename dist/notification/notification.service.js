"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const firebase = require("firebase-admin");
const path = require("path");
const genericError_exception_1 = require("../exceptions/genericError.exception");
firebase.initializeApp({
    credential: firebase.credential.cert(path.join(__dirname, '..', '..', 'bookpal-91ceb-firebase-adminsdk-yr83d-1af3c3ea22.json')),
});
class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notifications() {
        let notifications = [];
        try {
            notifications = await this.prisma.notification.findMany({});
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('NotificationService', error.message, 'notifications');
        }
        return notifications;
    }
    async createNotification(data) {
        try {
            this.prisma.notification.create({
                data,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('NotificationService', error.message, 'createNotification');
        }
    }
    async sendPushNotification({ body, title, token, }) {
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
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('NotificationService', error.message, 'sendPushNotification');
        }
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map