import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from './common/logger/logger.module';
import { AuthModule } from './security/auth/auth.module';
import { JwtAuthGuard } from './security/auth/guards/jwt-auth.guard';
import { ThrottleModule } from './security/throttle/throttle.module';
import { CustomExceptionFilter } from './common/exceptions/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import AppConfiguration from './config/app.config';
import DatabaseConfiguration from './config/database.config';
import AuthConfiguration from './config/auth.config';
import { DatabaseModule } from './providers/database/postgres/database.module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './module/admin/admin-auth/entities/admin-entity';
import { AdminAuthModule } from './module/admin/admin-auth/admin-auth.module';
import { UserAuthMiddleware } from './middleware/userAuth.middleware';
import { JobApplicationModule } from './module/job-application/job-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [AppConfiguration, DatabaseConfiguration, AuthConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    DatabaseModule,
    LoggerModule,
    ThrottlerModule.forRoot({
      ttl: 60, // Time to live in seconds
      limit: 20, // Number of requests per `ttl` seconds
    }),
    TypeOrmModule.forFeature([AdminEntity]),
    AuthModule,
    ThrottleModule,
    AdminAuthModule,
    JobApplicationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Add your interceptor class here
    },
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes('/admin/*');
  }
}
