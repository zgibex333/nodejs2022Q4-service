import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    return this.authService.signUp(dto);
  }
  @Post('login')
  @Public()
  login(@Body() dto: SignUpDTO) {
    return this.authService.login(dto);
  }
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['id'], user['refreshToken']);
  }
}
