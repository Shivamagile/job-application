import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { LoginDto } from 'src/common/dto/common.dto';
import { LoggerService } from 'src/common/logger/logger.service';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private myLogger: LoggerService) {
    this.myLogger.setContext(AuthService.name);
  }

  generateAuthToken(user: any) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: user.type,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN_SECRET,
      expiresIn: process.env.JWT_TONE_EXPIRY_TIME,
    });
  }
}
