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
    }),
  };
}

export function physicalBook(): PhysicalBookFactory {
  return {
    basic: () => ({
      barcode: '1234567890123',
      title: 'The Hobbit',
      reference: reference().basic(), // Call the reference function
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
