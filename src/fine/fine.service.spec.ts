import { Test, TestingModule } from '@nestjs/testing';
import { FineService } from './fine.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoanService } from '../loan/loan.service';
import { FineNotFound } from '../exceptions/fineNotFound.exception';
import { GenericError } from '../exceptions/genericError.exception';
import { loan as LoanFactory, fine as FineFactory } from '../utils/factory';

describe('FineService', () => {
  let service: FineService;
  const prismaServiceMock = {
    fine: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };
  const loanServiceMock = {
    loan: jest.fn(),
    createLoan: jest.fn(),
    updateLoan: jest.fn(),
    updateLoanStatus: jest.fn(),
    getLoanByUserID: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FineService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: LoanService, useValue: loanServiceMock },
      ],
    }).compile();

    service = module.get<FineService>(FineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a fine', async () => {
    const fineData = {
      amount: 10,
      pay_date: new Date(),
      last_update_date: new Date(),
      loan: {
        connect: {
          id: 1,
        },
      },
    };

    prismaServiceMock.fine.create.mockResolvedValue(fineData);

    const result = await service.fine(fineData);

    expect(result).toEqual(fineData);
  });

  describe('should get a fine', () => {
    it('by id', async () => {
      const fineData = {
        id: 1,
      };

      prismaServiceMock.fine.findUnique.mockResolvedValue(fineData);

      const result = await service.getFine(fineData);

      expect(result).toEqual(fineData);
    });

    it('by loan id', async () => {
      const fineData = {
        id: 1,
      };

      prismaServiceMock.fine.findUnique.mockResolvedValue(fineData);

      const result = await service.getFine(fineData);

      expect(result).toEqual(fineData);
    });

    it('and throw an FineNotFound exception if the fine does not exist', async () => {
      try {
        prismaServiceMock.fine.findUnique.mockResolvedValue([]);
        await service.getFine({ id: 1 });
      } catch (error: any) {
        expect(error).toBeInstanceOf(FineNotFound);
      }
    });

    it('and throw an GenericError excpetion if findUnique crashes', async () => {
      try {
        prismaServiceMock.fine.findUnique.mockResolvedValue(() => {
          throw new Error();
        });
        await service.getFine({ id: 1 });
      } catch (error: any) {
        expect(error).toBeInstanceOf(GenericError);
      }
    });
  });

  describe('should get all the fines', () => {
    describe('by user id', () => {
      it('and return all the fines', async () => {
        const fines = [
          FineFactory().custom({ id: 1, status: 'unpaid', loan_id: 1 }),
          FineFactory().custom({ id: 2, status: 'unpaid', loan_id: 2 }),
          FineFactory().custom({ id: 3, status: 'paid', loan_id: 3 }),
        ];

        loanServiceMock.getLoanByUserID.mockResolvedValue([
          LoanFactory().custom({ id: 1, user_id: 1 }),
          LoanFactory().custom({ id: 2, user_id: 1 }),
          LoanFactory().custom({ id: 3, user_id: 1 }),
        ]);
        prismaServiceMock.fine.findMany.mockResolvedValue(fines);

        const result = await service.getFinesByUserID({}, 1);

        expect(result).toEqual(fines);
      });

      it('and return all the unpaid fines', async () => {
        const fines = [
          FineFactory().custom({ id: 1, status: 'unpaid', loan_id: 1 }),
          FineFactory().custom({ id: 2, status: 'unpaid', loan_id: 2 }),
        ];

        loanServiceMock.getLoanByUserID.mockResolvedValue([
          LoanFactory().custom({ id: 1, user_id: 1 }),
          LoanFactory().custom({ id: 2, user_id: 1 }),
        ]);
        prismaServiceMock.fine.findMany.mockResolvedValue(fines);

        const result = await service.getFinesByUserID({ status: 'unpaid' }, 1);

        expect(result).toEqual(fines);
      });

      it('and return an empty array if there are no fines', async () => {
        const fines: any[] = [];

        loanServiceMock.getLoanByUserID.mockResolvedValue([
          LoanFactory().custom({ id: 1, user_id: 1 }),
          LoanFactory().custom({ id: 2, user_id: 1 }),
        ]);
        prismaServiceMock.fine.findMany.mockResolvedValue(fines);

        const result = await service.getFinesByUserID({}, 1);

        expect(result).toEqual(fines);
      });
    });
  });
});
