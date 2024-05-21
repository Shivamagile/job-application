import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    // You can also use host to get the request object
    let letData: unknown = {};
    const { url, body, headers } = request;
    const timestamp = new Date();

    if (
      headers.authorization &&
      headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const accessToken = headers.authorization.split(' ')[1];
      letData = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_TOKEN_SECRET,
      });
    }

    return next.handle().pipe(
      tap(() => {
        // You can add additional logic after the response is processed, if needed
      }),
    );
  }
}
