import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { company as companyFactory } from '../utils/factory';
import { Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';

describe('UserService', () => {
  let service: UserService;
  const company: Company = companyFactory().basic();

  const prismaServiceMock = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    // TODO - add some user factory to build the user data
    const userData = {
      id: '1',
      company: {
        connect: { id: company.id },
      },
      company_id: company.id,
      email: 'test@gmail.com',
      password: 'test_password',
      first_name: 'John',
      second_name: null,
      last_name: 'Doe',
      second_last_name: null,
      date_of_birth: new Date('1990-01-01'),
      is_admin: false,
      academic_program: null,
    };

    const userCreated = {
      ...userData,
      company: company,
    };

    prismaServiceMock.user.create.mockResolvedValue(userCreated);

    const result = await service.createUser(userData);

    expect(result).toEqual(userCreated);
  });

  describe('should get a user', () => {
    it('by email address', async () => {
      const userData = {
        email: 'test@gmail.com',
      };

      prismaServiceMock.user.findUnique.mockResolvedValue(userData);

      const result = await service.user(userData);

      expect(result).toEqual(userData);
    });

    it('by id', async () => {
      const userData = {
        id: '1',
      };

      prismaServiceMock.user.findUnique.mockResolvedValue(userData);

      const result = await service.user(userData);

      expect(result).toEqual(userData);
    });

    it('by id and company id', async () => {
      const userData = {
        id: '1',
        company_id: company.id,
      };

      prismaServiceMock.user.findUnique.mockResolvedValue(userData);

      const result = await service.user(userData);

      expect(result).toEqual(userData);
    });

    it('and throw an exception if the user is not found', async () => {
      const userData = {
        id: '23',
        company_id: company.id,
      };

      try {
        prismaServiceMock.user.findUnique.mockResolvedValue(null);
        await service.user(userData);
      } catch (error: any) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }
    });
  });
});
