import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { company as companyFactory } from '../utils/factory';
import { Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { user as UserFactory } from '../utils/factory';
describe('UserService', () => {
  let service: UserService;
  const company: Company = companyFactory().basic();

  const prismaServiceMock = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
    const userDataInput = UserFactory().basic();

    const userCreated = {
      ...userDataInput,
      company: {
        connect: { id: userDataInput.company_id },
      },
    };

    prismaServiceMock.user.create.mockResolvedValue(userCreated);

    const result = await service.createUser(userCreated);

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
        id: 1,
      };

      prismaServiceMock.user.findUnique.mockResolvedValue(userData);

      const result = await service.user(userData);

      expect(result).toEqual(userData);
    });

    it('by id and company id', async () => {
      const userData = {
        id: 1,
        company_id: company.id,
      };

      prismaServiceMock.user.findUnique.mockResolvedValue(userData);

      const result = await service.user(userData);

      expect(result).toEqual(userData);
    });

    it('and throw an exception if the user is not found', async () => {
      const userData = {
        id: 23,
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

  describe('should delete an user', () => {
    describe('with soft delete', () => {
      it('by email address', async () => {
        const userToSoftDelete = UserFactory().basic();
        prismaServiceMock.user.update.mockResolvedValue({
          deleted_at: new Date(),
          is_deleted: true,
        });
        const result = await service.softDeleteUser({
          email: userToSoftDelete.email,
        });
        expect(result.is_deleted).toBeTruthy();
        expect(result.deleted_at).toBeDefined();
      });
    });
  });
});
