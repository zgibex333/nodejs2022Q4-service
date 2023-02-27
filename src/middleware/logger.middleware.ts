import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, params, body, method } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `${method} ${statusCode} - url: ${originalUrl} - body: ${JSON.stringify(
          body,
        )} - params: ${JSON.stringify(params)}`,
      );
    });

    next();
  }
}
