import { HttpException, HttpStatus } from '@nestjs/common';
import {
  INVALID_CREDENTIALS,
  UNAUTHORISED_ACCESS,
} from 'src/common/constants/response.constant';

export const AuthExceptions = {
  TokenExpired(): any {
    return new HttpException(
      {
        message: 'Token Expired use RefreshToken',
        error: 'TokenExpiredError',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  InvalidToken(): any {
    return new HttpException(
      {
        message: 'Invalid Token',
        error: 'InvalidToken',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  InvalidIdPassword(): any {
    return new HttpException(
      {
        message: INVALID_CREDENTIALS,
        error: INVALID_CREDENTIALS,
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  ForbiddenException(): any {
    return new HttpException(
      {
        message: UNAUTHORISED_ACCESS,
        error: UNAUTHORISED_ACCESS,
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  InvalidUserId(): any {
    return new HttpException(
      {
        message: 'Invalid User Id',
        error: 'InvalidUserId',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  // InvalidIdPassword(): any {
  //   return new HttpException(
  //     {
  //       message: 'Invalid Username or Password',
  //       error: 'InvalidIdPassword',
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //     },
  //     HttpStatus.UNAUTHORIZED,
  //   );
  // },

  AccountNotexist(): any {
    return new HttpException(
      {
        message: 'Account does not exist!',
        error: 'accountNotexist',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  JobNotexist(): any {
    return new HttpException(
      {
        message: 'Job application does not exist!',
        error: 'jobappNotexist',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  AccountNotActive(): any {
    return new HttpException(
      {
        message: 'Account not active!',
        error: 'accountNotActive',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },
};
