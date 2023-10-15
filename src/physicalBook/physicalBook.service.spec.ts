import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBookService } from './physicalBook.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('BookService', () => {
  let service: PhysicalBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalBookService],
      imports: [PrismaModule],
    }).compile();
    service = module.get<PhysicalBookService>(PhysicalBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
