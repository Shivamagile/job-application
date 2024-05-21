import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Response, response } from 'express';
import { Public } from 'src/security/auth/auth.decorator';

@Controller('admin/auth')
@ApiTags('Admin')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  //------------------------------Admin-Page-Api-------------------
  //------------Admin-Log In-Api------------
  @Public()
  @Post('login')
  login(@Body() body: AdminLoginDto, @Res() res: Response) {
    return this.adminAuthService.adminLogin(body, res);
  }

  //------------Admin-Logout-Api------------
  @ApiBearerAuth()
  @Get('logout/:id')
  logout(@Param('id') id: string, @Res() response: Response) {
    return this.adminAuthService.adminlogout(id, response);
  }
}
