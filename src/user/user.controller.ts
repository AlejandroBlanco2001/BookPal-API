import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Request,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { Public } from '../utils/custom_decorators';
import { SecurityService } from '../utils/security/security.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private securityService: SecurityService,
  ) {}

  @Public()
  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  async createUser(@Body() data: CreateUserDTO): Promise<any> {
    const hashed_password = await this.securityService.hashPassword(
      data.password,
    );
    const { company_id, ...rest } = data;
    this.logger.log(`Creating user with email ${rest.email}`);
    const user = await this.userService.createUser({
      ...rest,
      company: {
        connect: {
          id: company_id,
        },
      },
      password: hashed_password,
    });
    return {
      status: HttpStatus.CREATED,
      user: user,
      message: 'The user has been successfully created.',
    };
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  getUserByID(@Param('id') id: number): Promise<UserModel | null> {
    return this.userService.user({ id: id });
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a user by email' })
  getUserByEmail(@Param('email') email: string): Promise<UserModel | null> {
    return this.userService.user({ email: email });
  }

  @Get('profile')
  @ApiOperation({
    summary: 'Get the profile of the current logged user',
  })
  getUserProfile(@Request() req: any): Promise<UserModel | null> {
    return req.user;
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Update a user by ID' })
  updateUserByID(
    @Body() data: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { id: id });
  }

  @Put('email/:email')
  @ApiOperation({ summary: 'Update a user by email' })
  updateUserByEmail(
    @Body('data') data: Prisma.UserUpdateInput,
    @Param('email') email: string,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { email: email });
  }
}
