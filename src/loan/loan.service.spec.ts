import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import {
  loan as LoanFactory,
  physicalBook as PhysicalFactory,
  fine as FineFactory,
  inventory as InventoryFactory,
  notification as NotificationFactory,
  reference as ReferenceFactory,
} from '../utils/factory';
import { ReferenceService } from '../reference/reference.service';
import { FineService } from '../fine/fine.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationService } from '../notification/notification.service';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { Loan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoanNotFound } from '../exceptions/loanNotFound.exceptions';
import { PhysicalBookNotAvailable } from '../exceptions/physicalBookNotAvailable.exception';
import { UserUnpaidFines } from '../exceptions/userUnpaidFines.exception';
import { MaximumLoansPerCollection } from '../exceptions/maximumLoansPerCollection.exception';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require('sinon');

describe('LoanService', () => {
  let service: LoanService;
  let clock: any;

  const mockLoan: Loan = LoanFactory().basic();
  const mockLoans = [
    LoanFactory().custom({ id: 1 }),
    LoanFactory().custom({ id: 2 }),
    LoanFactory().custom({ id: 3 }),
  ];

  const mockFine = FineFactory().custom({
    status: 'paid',
  });

  const mockFines = [
    FineFactory().custom({ id: 1 }),
    FineFactory().custom({ id: 2 }),
    FineFactory().custom({ id: 3 }),
  ];

  const mockNotification = NotificationFactory().basic();

  const mockPhysicalBook = PhysicalFactory().basic();

  const mockPhysicalBooks = [
    PhysicalFactory().custom({ id: 2 }),
    PhysicalFactory().custom({ id: 3 }),
  ];

  const mockInventory = InventoryFactory().basic();

  const mockReference = ReferenceFactory().basic();

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

  const PrismaServiceMock = {
    loan: {
      findUnique: jest.fn().mockResolvedValueOnce(mockLoan),
      findMany: jest.fn().mockResolvedValue(mockLoans),
      create: jest.fn().mockResolvedValueOnce(mockLoan),
      update: jest.fn().mockResolvedValue(mockLoan),
    },
  };

  const ReferenceServiceMock = {
    getDueDate: jest.fn().mockResolvedValueOnce(new Date()),
    getMaxLoans: jest.fn().mockResolvedValue(3),
    reference: jest.fn().mockResolvedValue(mockReference),
  };

  const FineServiceMock = {
    getFine: jest.fn().mockResolvedValue(mockFine),
    getFinesByUserID: jest.fn().mockResolvedValue([]),
    fine: jest.fn().mockResolvedValue(mockFine),
  };

  const PhyiscalBookServiceMock = {
    physicalBook: jest.fn().mockResolvedValue(mockPhysicalBook),
    physicalBooks: jest.fn().mockResolvedValue([]),
  };

  const InventoryServiceMock = {
    isPhysicalBookAvailable: jest.fn().mockResolvedValue(true),
    inventoryByPhyiscalSerialNumber: jest
      .fn()
      .mockResolvedValueOnce(mockInventory),
  };

  const NotificationServiceMock = {
    createNotification: jest.fn().mockResolvedValueOnce(mockNotification),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: PhysicalBookService,
          useValue: PhyiscalBookServiceMock,
        },
        {
          provide: ReferenceService,
          useValue: ReferenceServiceMock,
        },
        {
          provide: InventoryService,
          useValue: InventoryServiceMock,
        },
        {
          provide: NotificationService,
          useValue: NotificationServiceMock,
        },
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
        {
          provide: FineService,
          useValue: FineServiceMock,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loan', () => {
    it('should return a loan by ID', async () => {
      const result = await service.loan({ id: 1 });

      expect(result).toEqual(mockLoan);
    });

    it('should throw an error if the loan does not exist', async () => {
      try {
        PrismaServiceMock.loan.findUnique.mockResolvedValueOnce(null);
        await service.loan({ id: 1 });
      } catch (error) {
        expect(error).toBeInstanceOf(LoanNotFound);
      }
    });
  });

  describe('getUserLoans', () => {
    it('should return a user loans', async () => {
      const result = await service.getLoanByUserID({ id: 1 });
      expect(result).toEqual(mockLoans);
    });
  });

  /*
    Conditions
    1. The user has no unpaid fines
    2. The user has not reached the maximum number of loans for the collection
    3. The book is available
  */
  describe('createLoan', () => {
    it('should create a new loan if fullfill all the conditions', async () => {
      const result = await service.createLoan(1, {
        status: 'active',
        start_date: new Date(),
        due_date: new Date(),
        user: {
          connect: {
            id: 1,
          },
        },
        physical_book: {
          connect: {
            barcode: '123456789',
          },
        },
      });

      expect(result).toEqual(mockLoan);
    });

    describe('should throw ', () => {
      it('an PhysicalBookNotAvailable if the book is not available', async () => {
        try {
          InventoryServiceMock.isPhysicalBookAvailable.mockResolvedValueOnce(
            false,
          );
          await service.createLoan(1, {
            status: 'active',
            start_date: new Date(),
            due_date: new Date(),
            user: {
              connect: {
                id: 1,
              },
            },
            physical_book: {
              connect: {
                barcode: '123456789',
              },
            },
          });
        } catch (error) {
          expect(error).toBeInstanceOf(PhysicalBookNotAvailable);
        }
      });

      it('a UserUnpaidFines if the user has unpaid fines', async () => {
        try {
          FineServiceMock.getFinesByUserID.mockResolvedValueOnce(mockFines);
          await service.createLoan(1, {
            status: 'active',
            start_date: new Date(),
            due_date: new Date(),
            user: {
              connect: {
                id: 1,
              },
            },
            physical_book: {
              connect: {
                barcode: '123456789',
              },
            },
          });
        } catch (error) {
          expect(error).toBeInstanceOf(UserUnpaidFines);
        }
      });
      it('a MaximumLoansPerCollection if the user has reached the maximum number of loans for the collection', async () => {
        try {
          PhyiscalBookServiceMock.physicalBooks.mockResolvedValueOnce(
            mockPhysicalBooks,
          );
          ReferenceServiceMock.getMaxLoans.mockResolvedValueOnce(1);
          await service.createLoan(1, {
            status: 'active',
            start_date: new Date(),
            due_date: new Date(),
            user: {
              connect: {
                id: 1,
              },
            },
            physical_book: {
              connect: {
                barcode: '123456789',
              },
            },
          });
        } catch (error) {
          expect(error).toBeInstanceOf(MaximumLoansPerCollection);
        }
      });
    });
    describe('updateLoan', () => {
      it('should update a loan', async () => {
        const result = await service.updateLoan({
          where: { id: 1 },
          data: {
            status: 'active',
          },
        });

        expect(result).toEqual(mockLoan);
      });

      it('should throw UserUnpaidFines if the user has unpaid fines', async () => {
        try {
          FineServiceMock.getFinesByUserID.mockResolvedValueOnce(mockFines);
          await service.updateLoan({
            where: { id: 1 },
            data: {
              status: 'active',
            },
          });
        } catch (error) {
          expect(error).toBeInstanceOf(UserUnpaidFines);
        }
      });
    });
  });
});
