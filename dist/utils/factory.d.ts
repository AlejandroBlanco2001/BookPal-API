import { Book, Company, Fine, Inventory, Loan, PhysicalBook, Reference, User, Notification } from '@prisma/client';
type PhysicalBookFactory = {
    basic: () => Partial<PhysicalBook>;
    custom: (customProps: Partial<PhysicalBook>) => Partial<PhysicalBook>;
};
type CompanyFactory = {
    basic: () => Company;
};
type UserFactory = {
    basic: () => User;
    custom: (customProps: Partial<User>) => Partial<User>;
};
type BookFactory = {
    basic: () => Book;
    custom: (customProps: Partial<Book>) => Partial<Book>;
};
type ReferenceFactory = {
    basic: () => Reference;
};
type FineFactory = {
    basic: () => Fine;
    custom: (customProps: Partial<Fine>) => Partial<Fine>;
};
type LoanFactory = {
    basic: () => Loan;
    custom: (customProps: Partial<Loan>) => Partial<Loan>;
};
type InventoryFactory = {
    basic: () => Inventory;
    custom: (customProps: Partial<Inventory>) => Partial<Inventory>;
};
type NotificationFactory = {
    basic: () => Notification;
    custom: (customProps: Partial<Notification>) => Partial<Notification>;
};
export declare function user(): UserFactory;
export declare function company(): CompanyFactory;
export declare function physicalBook(): PhysicalBookFactory;
export declare function reference(): ReferenceFactory;
export declare function book(): BookFactory;
export declare function loan(): LoanFactory;
export declare function fine(): FineFactory;
export declare function inventory(): InventoryFactory;
export declare function notification(): NotificationFactory;
export {};
