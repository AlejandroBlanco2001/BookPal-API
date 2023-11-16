import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
  imports: [PrismaModule],
})
export class RatingModule {}
