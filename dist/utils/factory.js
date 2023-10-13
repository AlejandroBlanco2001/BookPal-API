"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = exports.company = exports.user = void 0;
function user() {
    const userCompany = company().basic();
    return {
        basic: () => ({
            id: 1,
            company: {
                connect: { id: userCompany.id },
            },
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
function book() {
    let customBook = {};
    return {
        basic: () => ({
            barcode: '1234567890123',
            title: 'The Hobbit',
        }),
        custom: (customProps) => {
            customBook = { ...customBook, ...customProps };
            return customBook;
        },
    };
}
exports.book = book;
//# sourceMappingURL=factory.js.map