"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const firebase = require("firebase-admin");
const path = require("path");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
firebase.initializeApp({
    credential: firebase.credential.cert(path.join(__dirname, '..', '..', 'bookpal-91ceb-firebase-adminsdk-yr83d-1af3c3ea22.json')),
});
let NotificationService = class NotificationService {
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
            return await this.prisma.notification.create({
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
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map