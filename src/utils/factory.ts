import {
  Book,
  Company,
  Fine,
  Inventory,
  Loan,
  PhysicalBook,
  Reference,
  User,
  Notification,
} from '@prisma/client';

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

export function user(): UserFactory {
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
      is_deleted: false,
      deleted_at: new Date(),
    }),
    custom: (customProps: Partial<User>) => {
      return { ...user().basic(), ...customProps };
    },
  };
}

export function company(): CompanyFactory {
  return {
    basic: () => ({
      id: 1,
      name: 'Test Company',
      book_scan_methods: ['barcode', 'rfid'],
      logo: 'https://www.google.com',
      primary_color: '#000000',
      secondary_color: '#ffffff',
      dynamic_code_return: '123456',
    }),
  };
}

export function physicalBook(): PhysicalBookFactory {
  const referenceObj = reference().basic();
  return {
    basic: () => ({
      barcode: '1234567890123',
      title: 'The Hobbit',
      reference: referenceObj,
      collection_id: 1,
    }),
    custom: (customProps: Partial<PhysicalBook>) => {
      return { ...physicalBook().basic(), ...customProps };
    },
  };
}

export function reference(): ReferenceFactory {
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

export function book(): BookFactory {
  const referenceObj: Reference = reference().basic();
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
    custom: (customProps: Partial<Book>) => {
      return { ...book().basic(), ...customProps };
    },
  };
}

export function loan(): LoanFactory {
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
      physical_book_barcode: physicalBookObj.barcode as string,
      physical_book: physicalBookObj,
      reference_id: referenceObj.id,
      reference: referenceObj,
      start_date: new Date(),
      return_date: new Date(),
    }),

    custom: (customProps: Partial<Loan>) => {
      return { ...loan().basic(), ...customProps };
    },
  };
}

export function fine(): FineFactory {
  const loanObj = loan().basic();
  const userObj = user().basic();

  return {
    basic: () => ({
      id: 1,
      amount: 1000,
      status: 'unpaid',
      pay_date: new Date(),
      last_update_date: new Date(),
      loan_id: loanObj.id,
      loan: loanObj,
      user_id: userObj.id,
    }),
    custom: (customProps: Partial<Fine>) => {
      return { ...fine().basic(), ...customProps };
    },
  };
}

export function inventory(): InventoryFactory {
  const physicalBookObj = physicalBook().basic();
  return {
    basic: () => ({
      id: 1,
      physical_book_serial_number: physicalBookObj.serial_number as string,
      creation_date: new Date(),
      last_update: new Date(),
      quantity: 1,
      minimum_quantity: 1,
      maximum_quantity: 10,
      reorder_quantity: 2,
    }),
    custom: (customProps: Partial<Inventory>) => {
      return { ...inventory().basic(), ...customProps };
    },
  };
}

export function notification(): NotificationFactory {
  return {
    basic: () => ({
      id: 1,
      title: 'Test Notification',
      message: 'This is a test notification',
      status: 'unread',
      next_schedule_date: new Date(),
    }),
    custom: (customProps: Partial<Notification>) => {
      return { ...notification().basic(), ...customProps };
    },
  };
}
