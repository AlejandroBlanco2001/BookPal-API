"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = exports.reference = exports.physicalBook = exports.company = exports.user = void 0;
function user() {
    const userCompany = company().basic();
    return {
        basic: () => ({
            id: 1,
            company: {
                connect: { id: userCompany.id },
            },
            profile_image: 'example.png',
            company_id: userCompany.id,
            email: 'test@gmail.com',
            password: 'test_password',
            first_name: 'John',
            second_name: null,
            last_name: 'Doe',
            second_last_name: null,
            date_of_birth: new Date('1990-01-01'),
            is_admin: false,
            academic_program: null,
        }),
        custom: (customProps) => {
            return { ...user().basic(), ...customProps };
        },
    };
}
exports.user = user;
function company() {
    return {
        basic: () => ({
            id: 1,
            name: 'Test Company',
            book_scan_methods: ['barcode', 'rfid'],
            logo: 'https://www.google.com',
            primary_color: '#000000',
            secondary_color: '#ffffff',
        }),
    };
}
exports.company = company;
function physicalBook() {
    return {
        basic: () => ({
            barcode: '1234567890123',
            title: 'The Hobbit',
            reference: reference().basic(),
        }),
        custom: (customProps) => {
            return { ...physicalBook().basic(), ...customProps };
        },
    };
}
exports.physicalBook = physicalBook;
function reference() {
    return {
        basic: () => {
            return {
                id: 1,
                reference_name: 'General',
                amount_of_money_per_day: 1000,
                amount_of_days_per_loan: 7,
                amount_of_loans_per_user: 3,
                limit_of_books_per_user: 20,
            };
        },
    };
}
exports.reference = reference;
function book() {
    const referenceObj = reference().basic();
    return {
        basic: () => ({
            id: 1,
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            original_title: 'The Hobbit',
            publish_date: new Date('1937-09-21'),
            reference_id: referenceObj.id,
            reference: referenceObj,
        }),
        custom: (customProps) => {
            return { ...book().basic(), ...customProps };
        },
    };
}
exports.book = book;
//# sourceMappingURL=factory.js.map