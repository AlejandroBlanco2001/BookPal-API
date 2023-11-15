import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { HistoryService } from '../history/history.service';
import { company as CompanyFactory } from '../utils/factory';

describe('CompanyController', () => {
  let controller: CompanyController;
  let companyMock = CompanyFactory().basic();

  const HistoryServiceMock = {};
  const CompanyServiceMock = {
    company: jest.fn().mockImplementation(),
    companies: jest.fn().mockImplementation(),
    updateCompany: jest.fn().mockImplementation(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: CompanyServiceMock,
        },
        {
          provide: HistoryService,
          useValue: HistoryServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
