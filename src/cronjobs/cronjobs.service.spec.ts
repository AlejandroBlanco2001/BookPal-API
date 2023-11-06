import { Test, TestingModule } from '@nestjs/testing';
import { CronjobsService } from './cronjobs.service';
import { NotificationService } from '../notification/notification.service';
import { FineService } from '../fine/fine.service';
import { LoanService } from '../loan/loan.service';

describe('CronjobsService', () => {
  let service: CronjobsService;

  const NotificationServiceMock = {};
  const FineServiceMock = {};
  const LoanServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronjobsService,
        {
          provide: NotificationService,
          useValue: NotificationServiceMock,
        },
        {
          provide: FineService,
          useValue: FineServiceMock,
        },
        {
          provide: LoanService,
          useValue: LoanServiceMock,
        },
      ],
    }).compile();

    service = module.get<CronjobsService>(CronjobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
