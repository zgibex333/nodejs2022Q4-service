import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class RJWTAuthGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {

    if (typeof context.args[0].body.refreshToken === 'undefined') {
      throw new UnauthorizedException('Body doesnt have Token!');
    }

    if (typeof context.args[0].body.refreshToken !== "string") {
      throw new ForbiddenException();
    }

    if (
      (info?.message === 'invalid signature' ||
        info?.message === 'jwt malformed')
    ) {
      throw new ForbiddenException('Invalid Token!');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
