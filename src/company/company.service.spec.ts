import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma/prisma.service';
import { company as CompanyFactory } from '../utils/factory';
import { CompanyNotFound } from '../exceptions/companyNotFound.exception';

describe('CompanyService', () => {
  let service: CompanyService;

  const prismaServiceMock = {
    company: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a company', () => {
    const companyInput = CompanyFactory().basic();

    prismaServiceMock.company.update.mockResolvedValue(companyInput);

    expect(
      service.updateCompany({
        where: { id: 1 },
        data: companyInput,
      }),
    ).resolves.toEqual(companyInput);
  });

  describe('should get a company', () => {
    it('given the id', async () => {
      const companyInput = CompanyFactory().basic();

      prismaServiceMock.company.findUnique.mockResolvedValue(companyInput);

      expect(service.company({ id: 1 })).resolves.toEqual(companyInput);
    });

    it(' and throw an error if the company does not exist', async () => {
      prismaServiceMock.company.findUnique.mockResolvedValue(null);

      expect(service.company({ id: 1 })).rejects.toThrow(CompanyNotFound);
    });
  });
});
