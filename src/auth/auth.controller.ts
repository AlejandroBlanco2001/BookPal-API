import { Controller, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../utils/custom_decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
