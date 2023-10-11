import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
      imports: [PrismaModule],
    }).compile();
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
