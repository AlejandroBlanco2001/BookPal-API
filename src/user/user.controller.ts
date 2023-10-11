import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id/:id')
  getUserByID(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: id });
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserModel | null> {
    return this.userService.user({ email: email });
  }

  @Put('id/:id')
  updateUserByID(
    @Body('data') data: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { id: id });
  }

  @Put('email/:email')
  updateUserByEmail(
    @Body('data') data: Prisma.UserUpdateInput,
    @Param('email') email: string,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, { email: email });
  }
}
