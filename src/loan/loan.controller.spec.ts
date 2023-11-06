import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { ReferenceService } from '../reference/reference.service';

describe('LoanController', () => {
  let controller: LoanController;

  const LoanServiceMock = {};
  const ReferenceServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: LoanServiceMock,
        },
        {
          provide: ReferenceService,
          useValue: ReferenceServiceMock,
        },
      ],
    }).compile();

    controller = module.get<LoanController>(LoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
