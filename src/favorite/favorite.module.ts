import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PhysicalBookModule } from 'src/physicalBook/physicalBook.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
  imports: [PrismaModule, PhysicalBookModule],
})
export class FavoriteModule {}
