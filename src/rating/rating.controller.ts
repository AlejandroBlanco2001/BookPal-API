import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { Rating as RatingModel } from '@prisma/client';
import CreateRatingDTO from './dto/create-rating.dto';
import UpdateRatingDTO from './dto/update-rating.dto';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get a rating by ID' })
  @ApiResponse({
    status: 200,
    description: 'The rating has been successfully retrieved.',
  })
  async getRatingByID(@Param('id') id: number): Promise<RatingModel | null> {
    return await this.ratingService.rating({ id: id });
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({
    status: 200,
    description: 'The ratings have been successfully retrieved.',
  })
  async getRatings(): Promise<RatingModel[]> {
    return await this.ratingService.ratings({});
  }

  @Get('/book/:book_id')
  @ApiOperation({ summary: 'Get all ratings for a book' })
  @ApiResponse({
    status: 200,
    description: 'The ratings have been successfully retrieved.',
  })
  async getRatingsForBook(
    @Param('book_id') book_id: string,
  ): Promise<RatingModel[]> {
    return await this.ratingService.ratings({
      where: {
        physical_book_barcode: book_id,
      },
    });
  }

  @Get('/user/:user_id')
  @ApiOperation({ summary: 'Get all ratings for a user' })
  @ApiResponse({
    status: 200,
    description: 'The ratings have been successfully retrieved.',
  })
  async getRatingsForUser(
    @Param('user_id') user_id: number,
  ): Promise<RatingModel[]> {
    return await this.ratingService.ratings({
      where: {
        user_id: user_id,
      },
    });
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new rating' })
  @ApiResponse({
    status: 201,
    description: 'The rating has been successfully created.',
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async createRating(
    @Request() req: any,
    @Body() data: CreateRatingDTO,
  ): Promise<any> {
    return await this.ratingService.createRating({
      rating: data.rating,
      user: {
        connect: {
          id: Number(req.user.id),
        },
      },
      email: req.user.email,
      phyiscal_book: {
        connect: {
          barcode: data.physical_book_barcode,
        },
      },
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a rating' })
  @ApiResponse({
    status: 201,
    description: 'The rating has been successfully updated.',
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async updateRating(
    @Request() req: any,
    @Body() data: UpdateRatingDTO,
    @Param('id') id: number,
  ): Promise<any> {
    return await this.ratingService.updateRating({
      where: {
        user_id: Number(req.user.id),
        id: Number(id),
      },
      data: {
        rating: data.rating,
      },
    });
  }
}
