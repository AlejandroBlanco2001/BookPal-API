import { Book, Company, Fine, Loan, PhysicalBook, Reference, User } from '@prisma/client';
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
export declare function user(): UserFactory;
export declare function company(): CompanyFactory;
export declare function physicalBook(): PhysicalBookFactory;
export declare function reference(): ReferenceFactory;
export declare function book(): BookFactory;
export declare function loan(): LoanFactory;
export declare function fine(): FineFactory;
export {};
