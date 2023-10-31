"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fine = exports.loan = exports.book = exports.reference = exports.physicalBook = exports.company = exports.user = void 0;
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
    const referenceObj = reference().basic();
    return {
        basic: () => ({
            barcode: '1234567890123',
            title: 'The Hobbit',
            reference: referenceObj,
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
function loan() {
    const userObj = user().basic();
    const physicalBookObj = physicalBook().basic();
    const referenceObj = reference().basic();
    return {
        basic: () => ({
            id: 1,
            status: 'active',
            due_date: new Date(),
            user_id: userObj.id,
            user: userObj,
            physical_book_barcode: physicalBookObj.barcode,
            physical_book: physicalBookObj,
            reference_id: referenceObj.id,
            reference: referenceObj,
            start_date: new Date(),
            return_date: new Date(),
        }),
        custom: (customProps) => {
            return { ...loan().basic(), ...customProps };
        },
    };
}
exports.loan = loan;
function fine() {
    const loanObj = loan().basic();
    return {
        basic: () => ({
            id: 1,
            amount: 1000,
            status: 'unpaid',
            pay_date: new Date(),
            last_update_date: new Date(),
            loan_id: loanObj.id,
            loan: loanObj,
        }),
        custom: (customProps) => {
            return { ...fine().basic(), ...customProps };
        },
    };
}
exports.fine = fine;
//# sourceMappingURL=factory.js.map