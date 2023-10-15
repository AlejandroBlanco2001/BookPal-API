import { Test, TestingModule } from '@nestjs/testing';
import { PhyiscalBookController } from './physicalBook.controller';
import { PhysicalBookService } from './physicalBook.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookController', () => {
  let controller: PhyiscalBookController;

  const mockBookService = {
    getBook: jest.fn(),
    getBooks: jest.fn(),
  };

  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhyiscalBookController],
      providers: [
        {
          provide: PhysicalBookService,
          useValue: mockBookService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<PhyiscalBookController>(PhyiscalBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
