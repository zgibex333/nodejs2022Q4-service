import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
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
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    return this.authService.signUp(dto);
  }
  @HttpCode(200)
  @Post('login')
  @Public()
  login(@Body() dto: SignUpDTO) {
    return this.authService.login(dto);
  }
  @HttpCode(200)
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto, @Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(dto, user['id'], user['refreshToken']);
  }
}
