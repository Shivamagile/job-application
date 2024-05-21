import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplicationEntity } from './entities/jobapplication-entity';
import { Brackets, Repository } from 'typeorm';
import { EducationEntity } from './entities/education-entity';
import { WorkExperienceEntity } from './entities/workexperience-entity';
import { LanguageEntity } from './entities/language-entity';
import { TechnicalExperienceEntity } from './entities/technicalexperience-entity';
import { Response, response } from 'express';
import { AuthExceptions, CustomError } from 'src/common/helpers/exceptions';
import { statusOk } from 'src/common/helpers/responses/respones.status.constant';
import { successResponse } from 'src/common/helpers/responses/success.helper';
import {
  JOB_APPLICATION_CREATED,
  JOB_APPLICATION_DELETED,
  JOB_APPLICATION_FETCHED,
  JOB_APPLICATION_SEARCH,
} from 'src/common/constants/response.constant';
import { TABLE_JOB_APPLICATION } from 'src/common/constants/table-name.constant';
import { PaginationDto } from 'src/common/dto/common.dto';
import { usePagination } from 'src/common/helpers/query.helper';
import { UpdateJobApplicationDto } from './dto/updated-job-application.dto';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { DateUtils } from 'src/common/helpers/date.helper';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplicationEntity)
    private readonly jobApplicationModel: Repository<JobApplicationEntity>,
    @InjectRepository(EducationEntity)
    private readonly educationModel: Repository<EducationEntity>,
    @InjectRepository(WorkExperienceEntity)
    private readonly workExperienceModel: Repository<WorkExperienceEntity>,
    @InjectRepository(LanguageEntity)
    private readonly languageModel: Repository<LanguageEntity>,
    @InjectRepository(TechnicalExperienceEntity)
    private readonly technicalExperienceModel: Repository<TechnicalExperienceEntity>,
  ) {}

  //Create job application
  async createJobApplication(
    body: CreateJobApplicationDto,
    response: Response,
  ) {
    try {
      // Extract and create the job application object
      const jobObject = {
        name: body.name,
        address: body.address,
        gender: body.gender,
        email: body.email,
        contact: body.contact,
        preferredLocation: body.preferredLocation,
        expectedCTC: body.expectedCTC,
        currentCTC: body.currentCTC,
        noticePeriod: body.noticePeriod,
        status: 'pending', // Assuming status is defaulted to 'pending'
      };

      // Use the correct create method
      const createJobApplication = this.jobApplicationModel.create(jobObject);
      const jobCreatedObj = await this.jobApplicationModel.save(
        createJobApplication,
      );

      // Create education objects
      const educationObjs = body.educationDetails.map((education) => ({
        jobApplicationId: jobCreatedObj['id'],
        degree: education.degree,
        boardUniversity: education.boardUniversity,
        year: parseInt(education.year, 10), // Ensure year is a number
        cgpaPercentage: parseFloat(education.cgpaPercentage), // Ensure cgpaPercentage is a number
      }));
      const createEducation = this.educationModel.create(educationObjs);
      await this.educationModel.save(createEducation);

      // Create work experience objects
      const workExperienceObjs = body.workExperience.map((work) => ({
        jobApplicationId: jobCreatedObj['id'],
        company: work.company,
        designation: work.designation,
        from: work.from,
        to: work.to,
      }));
      const createWorkExperience =
        this.workExperienceModel.create(workExperienceObjs);
      await this.workExperienceModel.save(createWorkExperience);

      // Create language objects
      const languageObjs = body.knownLanguages.map((language) => ({
        jobApplicationId: jobCreatedObj['id'],
        language: language.language_name,
        read: language.read,
        write: language.write,
        speak: language.speak,
      }));
      const createLanguage = this.languageModel.create(languageObjs);
      await this.languageModel.save(createLanguage);

      // Create technical experience objects
      const technicalExperienceObjs = body.technicalExperience.map((tech) => ({
        jobApplicationId: jobCreatedObj['id'],
        technology: tech.technology,
        level: tech.level,
      }));
      const createTechnicalExperience = this.technicalExperienceModel.create(
        technicalExperienceObjs,
      );
      await this.technicalExperienceModel.save(createTechnicalExperience);

      // Return success response
      return response
        .status(200)
        .json({ message: 'Job Application Created Successfully' });
    } catch (error) {
      throw CustomError.UnknownError(error.message, error.status);
    }
  }

  // Find job application
  async findOne(id: string, response: Response) {
    try {
      const jobApp = await this.jobApplicationModel.findOne({
        where: { id: Number(id) },
        relations: [
          'educationDetails',
          'workExperience',
          'knownLanguages',
          'technicalExperience',
        ], // Include relations to avoid multiple queries
      });
      // // Convert work experience dates to dd/mm/yyyy
      // if (jobApp.workExperience) {
      //   jobApp.workExperience = jobApp.workExperience.map((workExp) => ({
      //     ...workExp,
      //     from: formatDate(workExp.from),
      //     to: formatDate(workExp.to),
      //   }));
      // }

      if (!jobApp) {
        throw AuthExceptions.JobNotexist();
      }
      return response
        .status(statusOk)
        .json(successResponse(statusOk, JOB_APPLICATION_FETCHED, jobApp));
    } catch (error) {
      // If any error occurs, throw a custom "Unknown Error" with the error message and status
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Update job application
  async updateJobApplication(
    id: string,
    body: UpdateJobApplicationDto,
    response: Response,
  ) {
    try {
      const jobApplication = await this.jobApplicationModel.findOne({
        where: { id: Number(id) },
      });

      if (!jobApplication) {
        throw AuthExceptions.JobNotexist();
      }
      // Update the job application entity with the data from the DTO
      Object.assign(jobApplication, body);

      const updatedJobApplication = await this.jobApplicationModel.save(
        jobApplication,
      );
      // console.log('updatedJobApplication: ', updatedJobApplication);
      // return updatedJobApplication;

      return response
        .status(statusOk)
        .json(
          successResponse(statusOk, 'Job application updated successfully', {}),
        );
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Delete job application
  async deleteJobApplication(id: string, response: Response) {
    try {
      const jobApplication = await this.jobApplicationModel.findOne({
        where: { id: Number(id) },
      });

      if (!jobApplication) {
        throw AuthExceptions.JobNotexist();
      }

      await this.jobApplicationModel.remove(jobApplication);

      return response
        .status(statusOk)
        .json(successResponse(statusOk, JOB_APPLICATION_DELETED, {}));
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Search job application
  async searchJobApplications(body: PaginationDto, response: Response) {
    try {
      // Check if the request body is empty
      if (!Object.keys(body).length) {
        // Return all records without pagination or search filters
        const jobApplications = await this.jobApplicationModel.find({
          relations: [
            'educationDetails',
            'workExperience',
            'knownLanguages',
            'technicalExperience',
          ], // Include relations to avoid multiple queries
        });
        return response.status(statusOk).json(
          successResponse(statusOk, JOB_APPLICATION_SEARCH, {
            jobList: jobApplications,
          }),
        );
      } else {
        // Extract pagination parameters from the request body
        const { skip, take, search, sort_by, sort_order } = usePagination(body);

        // Create a query builder for the JobApplicationModel
        const query = this.jobApplicationModel
          .createQueryBuilder(TABLE_JOB_APPLICATION)
          .leftJoinAndSelect(
            `${TABLE_JOB_APPLICATION}.educationDetails`,
            'educationDetails',
          )
          .leftJoinAndSelect(
            `${TABLE_JOB_APPLICATION}.workExperience`,
            'workExperience',
          )
          .leftJoinAndSelect(
            `${TABLE_JOB_APPLICATION}.knownLanguages`,
            'knownLanguages',
          )
          .leftJoinAndSelect(
            `${TABLE_JOB_APPLICATION}.technicalExperience`,
            'technicalExperience',
          );

        // Apply sorting based on provided sortBy and sortOrder
        // if (sort_by) query.orderBy(`${TABLE_JOB_APPLICATION}.${sort_by}`, sort_order);
        // else
        query.orderBy(`${TABLE_JOB_APPLICATION}.created_at`, 'DESC');

        // Apply search filter if search term is provided
        if (search) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where(`${TABLE_JOB_APPLICATION}.name ILIKE :search`, {
                search: `%${search.trim()}%`,
              }).orWhere(
                `${TABLE_JOB_APPLICATION}.preferredLocation ILIKE :search`,
                {
                  search: `%${search.trim()}%`,
                },
              );
              // Add more conditions for other searchable columns if needed
            }),
          );
        }

        // Apply pagination using skip and take
        if (skip >= 0 && take) query.take(take).skip(skip);

        // Execute the query to search job applications
        const jobApplications = await query.getMany();

        // Return the search results as JSON response
        return response.status(statusOk).json(
          successResponse(statusOk, JOB_APPLICATION_SEARCH, {
            jobList: jobApplications,
          }),
        );
      }
    } catch (error) {
      // Handle any errors that occur during the search process
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Total Appilication Count APi
  async JobApplicationCount(response: Response) {
    try {
      const jobCount = await this.jobApplicationModel.count();
      // Return the search results as JSON response
      return response.status(statusOk).json(
        successResponse(statusOk, '', {
          count: jobCount,
        }),
      );
    } catch (error) {
      console.log('error: ', error);
      // Handle any errors that occur during the search process
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }
}
