import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from './history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HistoryService', () => {
  let service: HistoryService;

  const PrismaServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        { provide: PrismaService, useValue: PrismaServiceMock },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
