import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signUp(creds: SignUpDTO) {
    const hash = await this.hashData(creds.password);
    const newUser = await this.usersService.create({
      login: creds.login,
      password: hash,
    });

    return newUser;
  }
  async login(dto: SignUpDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    if (!user) throw new ForbiddenException();

    const passwordIsValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordIsValid) throw new ForbiddenException();

    const accessToken = await this.generateToken(
      user.id,
      user.login,
      process.env.TOKEN_EXPIRE_TIME,
      process.env.JWT_SECRET_KEY,
    );
    const refreshToken = await this.generateToken(
      user.id,
      user.login,
      process.env.TOKEN_REFRESH_EXPIRE_TIME,
      process.env.JWT_SECRET_REFRESH_KEY,
    );
    
    await this.updateRtHash(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  async refresh(dto: RefreshTokenDto, userId: string, rt: string) {
    const userWithRt = await this.prisma.userWithToken.findFirst({
      where: {
        id: userId,
      },
    });

    if(!userWithRt) throw new ForbiddenException()
    
    const { refreshToken: rToken } = dto;
    if (!rToken) throw new UnauthorizedException();
    const bodyTokenIsValid = await bcrypt.compare(rToken, userWithRt.refreshToken);
    if (!bodyTokenIsValid || rToken !== rt) throw new ForbiddenException();

    if (!userWithRt) throw new ForbiddenException();
    const rtIsExistingInDB = await bcrypt.compare(rt, userWithRt.refreshToken);
    if (!rtIsExistingInDB) throw new ForbiddenException();

    const user = await this.usersService.findOne(userId);
    const accessToken = await this.generateToken(
      user.id,
      user.login,
      process.env.TOKEN_EXPIRE_TIME,
      process.env.JWT_SECRET_KEY,
    );
    const refreshToken = await this.generateToken(
      user.id,
      user.login,
      process.env.TOKEN_REFRESH_EXPIRE_TIME,
      process.env.JWT_SECRET_REFRESH_KEY,
    );
    await this.updateRtHash(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, +process.env.CRYPT_SALT);
  }

  async generateToken(
    id: string,
    login: string,
    expiresIn: string,
    secret: string,
  ) {
    return this.jwtService.signAsync(
      { id, login },
      {
        expiresIn,
        secret,
      },
    );
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.userWithToken.upsert({
      where: {
        id: userId,
      },
      update: {
        refreshToken: hash,
      },
      create: {
        id: userId,
        refreshToken: hash,
      },
    });
  }
}
