import { Test, TestingModule } from '@nestjs/testing';
import { FineService } from './fine.service';

describe('FineService', () => {
  let service: FineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FineService],
    }).compile();

    service = module.get<FineService>(FineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
