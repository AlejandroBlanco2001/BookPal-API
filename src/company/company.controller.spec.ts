import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { HistoryService } from '../history/history.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  const HistoryServiceMock = {};
  const CompanyServiceMock = {};

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
