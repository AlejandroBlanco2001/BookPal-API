import { Book, Company, PhysicalBook, Reference, User } from '@prisma/client';
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
export declare function user(): UserFactory;
export declare function company(): CompanyFactory;
export declare function physicalBook(): PhysicalBookFactory;
export declare function reference(): ReferenceFactory;
export declare function book(): BookFactory;
export {};
