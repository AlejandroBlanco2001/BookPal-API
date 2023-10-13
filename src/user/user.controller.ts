import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { Public } from '../utils/custom_decorators';
import { SecurityService } from '../utils/security/security.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private securityService: SecurityService,
  ) {}

  @Public()
  @Post('/')
  async createUser(@Body('data') data: Prisma.UserCreateInput): Promise<any> {
    const hashed_password = await this.securityService.hashPassword(
      data.password,
    );
    return this.userService.createUser({
      ...data,
      password: hashed_password,
    });
  }

  @Get('id/:id')
  getUserByID(@Param('id') id: number): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserModel | null> {
    return this.userService.user({ email: email });
  }

  @Get('profile')
  getUserProfile(@Request() req: any): Promise<UserModel | null> {
    return req.user;
  }

  @Put('id/:id')
  updateUserByID(
    @Body('data') data: Prisma.UserUpdateInput,
    @Param('id') id: number,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { id: Number(id) });
  }

  @Put('email/:email')
  updateUserByEmail(
    @Body('data') data: Prisma.UserUpdateInput,
    @Param('email') email: string,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { email: email });
  }
}
