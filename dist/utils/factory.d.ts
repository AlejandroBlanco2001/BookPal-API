import { Company, PhysicalBook, User } from '@prisma/client';
type BookFactory = {
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
export declare function user(): UserFactory;
export declare function company(): CompanyFactory;
export declare function book(): BookFactory;
export {};
