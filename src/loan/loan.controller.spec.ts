import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { loan as LoanFactory } from '../utils/factory';
import { LoanStatus } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require('sinon');

describe('LoanController', () => {
  let controller: LoanController;
  let clock: any;
  const mockLoan = LoanFactory().basic();

  beforeAll(() => {
    clock = sinon.useFakeTimers({
      now: new Date('2020-01-01T00:00:00.000Z'),
      shouldAdvanceTime: false,
      toFake: ['Date'],
    });
  });

  afterEach(() => {
    clock.restore();
  });

  const LoanServiceMock = {
    loan: jest.fn().mockResolvedValue(mockLoan),
    getLoanByUserID: jest.fn().mockResolvedValue(mockLoan),
    createLoan: jest.fn().mockResolvedValue(mockLoan),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: LoanServiceMock,
        },
      ],
    }).compile();

    controller = module.get<LoanController>(LoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLoanByID', () => {
    it('should return a loan', async () => {
      const result = mockLoan;
      const call = await controller.getLoanByID('1');
      expect(call).toBe(result);
    });
  });

  describe('getUserLoans', () => {
    it('should return a list of loans', async () => {
      const result = mockLoan;
      const call = await controller.getUserLoans('1');
      expect(call).toBe(result);
    });
  });

  describe('createLoan', () => {
    it('should create a loan', async () => {
      const result = LoanFactory().custom({
        physical_book_barcode: '1234567890123',
        start_date: new Date('2020-01-01T00:00:00.000Z'),
      });

      LoanServiceMock.createLoan.mockResolvedValueOnce(result);

      const call = await controller.createLoan(
        {
          user: {
            id: 1,
          },
        },
        {
          physical_book_barcode: '1234567890123',
          phone_token: '1234567890123',
        },
      );

      const expectedInput = {
        status: LoanStatus.active,
        start_date: new Date(),
        user: {
          connect: {
            id: 1,
          },
        },
        user_id: 1,
        physical_book: {
          connect: {
            barcode: '1234567890123',
          },
        },
        physical_book_barcode: '1234567890123',
      };

      expect(call).toBe(result);
      expect(LoanServiceMock.createLoan).toHaveBeenCalledWith(1, expectedInput);
    });
  });
});
