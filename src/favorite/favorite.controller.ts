import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all favorites' })
  async getFavorites(@Query('items') items: number) {
    return await this.favoriteService.getAllFavorites(items);
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get all favorites of a user' })
  async getFavoritesFromUser(@Request() req: any) {
    return await this.favoriteService.favorites({
      where: {
        user_id: req.user.id,
      },
    });
  }

  @Get('/book/:barcode')
  @ApiOperation({ summary: 'Get all favorites of a book' })
  async getFavoritesFromBook(@Param('barcode') barcode: string) {
    return await this.favoriteService.favorites({
      where: {
        physical_book_barcode: barcode,
      },
    });
  }

  @Get('/favorites')
  @ApiOperation({ summary: 'Get all favorites of a book' })
  async getMostFavorites() {
    return await this.favoriteService.mostFavoritePhysicalBooks();
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new favorite' })
  async createFavorite(@Request() req: any, @Body() data: CreateFavoriteDto) {
    return await this.favoriteService.bookmarkFavorite({
      user: {
        connect: {
          id: req.user.id,
        },
      },
      physical_book: {
        connect: {
          barcode: data.physical_book_barcode,
        },
      },
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a favorite' })
  async deleteFavorite(@Request() req: any, @Param('id') id: string) {
    return await this.favoriteService.unbookmarkFavorite({
      user_id: req.user.id,
      id: Number(id),
    });
  }
}
