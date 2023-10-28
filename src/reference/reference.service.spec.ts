import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceService } from './reference.service';
import { reference as ReferenceFactory } from '../utils/factory';
import { Reference } from '@prisma/client';
import { ReferenceNotFound } from '../exceptions/referenceNotFound.exception';
import { PrismaService } from '../prisma/prisma.service';

describe('ReferenceService', () => {
  let service: ReferenceService;

  const prismaServiceMock = {
    reference: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferenceService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ReferenceService>(ReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should find a reference', () => {
    it('by id', async () => {
      const referenceDB: Reference = ReferenceFactory().basic();

      prismaServiceMock.reference.findUnique.mockResolvedValue(referenceDB);

      const result = await service.reference({ id: referenceDB.id });

      expect(result).toEqual(referenceDB);
    });

    it('and throw an error if not found', async () => {
      try {
        prismaServiceMock.reference.findUnique.mockResolvedValue([]);
        await expect(service.reference({ id: 2 }));
      } catch (error: any) {
        expect(error).toBeInstanceOf(ReferenceNotFound);
      }
    });
  });

  it('should get due date', async () => {
    const referenceDB: Reference = ReferenceFactory().basic();
    const date = new Date();
    prismaServiceMock.reference.findUnique.mockResolvedValue(referenceDB);
    const result = await service.getDueDate({ id: referenceDB.id });
    date.setDate(date.getDate() + referenceDB!.amount_of_days_per_loan);
    expect(result).toEqual(date);
  });

  it('should get max loans', async () => {
    const referenceDB: Reference = ReferenceFactory().basic();
    prismaServiceMock.reference.findUnique.mockResolvedValue(referenceDB);
    const result = await service.getMaxLoans({ id: referenceDB.id });
    expect(result).toEqual(referenceDB.limit_of_books_per_user);
  });
});
