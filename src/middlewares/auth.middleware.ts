import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);
  constructor(private readonly jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use(request: Request, response: Response, next: NextFunction) {
    console.log(request.headers);
    if (request.headers['authorization']) {
      const token = request.headers['authorization'] ?? '';

      try {
        const result = this.jwtService.verify(token.split(' ')[1]);

        request.headers.info = result;
        next();
      } catch (e) {
        this.logger.error((e as Error).message);

        if ((e as Error).name === 'TokenExpiredError') {
          throw new HttpException('Token is expired', 400);
        } else {
          throw new HttpException('Bad request', 400);
        }
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
