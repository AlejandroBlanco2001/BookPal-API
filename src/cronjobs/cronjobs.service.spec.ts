import { Test, TestingModule } from '@nestjs/testing';
import { CronjobsService } from './cronjobs.service';

describe('CronjobsService', () => {
  let service: CronjobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronjobsService],
    }).compile();

    service = module.get<CronjobsService>(CronjobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
