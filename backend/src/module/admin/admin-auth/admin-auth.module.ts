import { Module, OnModuleInit } from '@nestjs/common';
import { AdminEntity } from './entities/admin-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthService } from './admin-auth.service';
import { AuthService } from 'src/security/auth/auth.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/services/common.service';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [
    AdminAuthService,
    AuthService,
    LoggerService,
    JwtService,
    CommonService,
  ],
  controllers: [AdminAuthController],
})
export class AdminAuthModule implements OnModuleInit {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async onModuleInit(): Promise<void> {
    await this.adminAuthService.createAdminInitialUser();
  }
}
