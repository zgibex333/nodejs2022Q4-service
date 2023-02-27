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
    const headerToken = context.args[0].headers['authorization'] ?? context.args[0].headers['Authorization']
    const bodyToken = context.args[0].body.refreshToken
    if (typeof bodyToken === 'undefined') {
      throw new UnauthorizedException('Body doesnt have Token!');
    }

    if (typeof bodyToken !== "string") {
      throw new ForbiddenException("Wrong token format");
    }
    console.log(bodyToken, "bodyToken");
    console.log(headerToken, "headerToken");
    
    if(`Bearer ${bodyToken}` !== headerToken) {
      throw new ForbiddenException('Body and header tokens should be equal!');
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
