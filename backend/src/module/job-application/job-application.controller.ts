import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { Request, Response, response } from 'express';
import { Public } from 'src/security/auth/auth.decorator';
import { JobApplicationService } from './job-application.service';
import { PaginationDto } from 'src/common/dto/common.dto';
import { UpdateJobApplicationDto } from './dto/updated-job-application.dto';

@ApiTags('Job Application')
@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Public()
  @Post('create')
  createJobApplication(
    @Res() res: Response,
    @Body() body: CreateJobApplicationDto,
  ) {
    return this.jobApplicationService.createJobApplication(body, res);
  }

  @ApiBearerAuth()
  @Get('details/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    return this.jobApplicationService.findOne(id, res);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  async updateJobApplication(
    @Param('id') id: string,
    @Body() body: UpdateJobApplicationDto,
    @Res() response: Response,
  ) {
    return this.jobApplicationService.updateJobApplication(id, body, response);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  async deleteJobApplication(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    return this.jobApplicationService.deleteJobApplication(id, response);
  }

  @ApiBearerAuth()
  @ApiPropertyOptional()
  @Post('search')
  async searchJobApplication(
    @Body() Body: PaginationDto,
    @Res() response: Response,
  ) {
    return this.jobApplicationService.searchJobApplications(Body, response);
  }

  @Public()
  @Get('count')
  getJobApplicationCount(@Res() response: Response) {
    return this.jobApplicationService.JobApplicationCount(response);
  }
}
