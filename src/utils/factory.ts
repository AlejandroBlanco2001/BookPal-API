import { Company, PhysicalBook, User } from '@prisma/client';

type BookFactory = {
  basic: () => Partial<PhysicalBook>;
  custom: (customProps: Partial<PhysicalBook>) => Partial<PhysicalBook>;
};

type CompanyFactory = {
  basic: () => Company;
};

type UserFactory = {
  basic: () => Partial<User>;
  custom: (customProps: Partial<User>) => Partial<User>;
};

export function user(): UserFactory {
  const userCompany = company().basic();
  return {
    basic: () => ({
      id: '1',
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
    custom: (customProps: Partial<User>) => {
      return { ...user().basic(), ...customProps };
    },
  };
}

export function company(): CompanyFactory {
  return {
    basic: () => ({
      id: '1',
      name: 'Test Company',
      enable_book_scan_methods: ['barcode', 'rfid'],
      logo: 'https://www.google.com',
      primary_color: '#000000',
      secondary_color: '#ffffff',
    }),
  };
}

export function book(): BookFactory {
  let customBook: Partial<PhysicalBook> = {};
  return {
    basic: () => ({
      barcode: '1234567890123',
      title: 'The Hobbit',
    }),
    custom: (customProps: Partial<PhysicalBook>) => {
      customBook = { ...customBook, ...customProps };
      return customBook;
    },
  };
}
