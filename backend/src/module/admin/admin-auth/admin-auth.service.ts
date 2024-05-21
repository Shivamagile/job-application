import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'src/common/helpers/responses/success.helper';
import {
  ADMIN_EMAIL,
  ADMIN_LOGOUT_SUCC,
  ADMIN_NOT_FOUND,
  ADMIN_PASSWORD,
  SUCCESS_MSG,
} from 'src/common/constants/response.constant';
import { Response, response } from 'express';

import { bcryptPassword } from 'src/common/helpers/bcrypt.helper';
import { AdminCommonInterface } from 'src/common/interfaces/commons.interface';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  AuthExceptions,
  CustomError,
  TypeExceptions,
} from 'src/common/helpers/exceptions';
import { AuthService } from 'src/security/auth/auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import {
  statusBadRequest,
  statusOk,
} from 'src/common/helpers/responses/respones.status.constant';
@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminModel: Repository<AdminEntity>,
    private authService: AuthService,
    private loggerService: LoggerService,
  ) {}

  ///-----------------ADMIN-LOGIN---------------
  async adminLogin(body: AdminLoginDto, res: Response) {
    try {
      // Check if email format is invalid
      const findAdminResult = await this.findExistingEmail(body.email);

      // Check if admin user not found
      if (findAdminResult && !findAdminResult.status) {
        // Admin not found, throw a not found exception
        throw TypeExceptions.NotFoundCommMsg(ADMIN_NOT_FOUND);
      }
      // Admin found, validate password
      const findAdmin = findAdminResult.adminDetails;

      // Validate password
      if (!bcrypt.compareSync(body.password, findAdmin.password)) {
        // Password mismatch, throw an invalid ID or password exception
        throw AuthExceptions.InvalidIdPassword();
      }
      // Removing Password
      delete findAdmin.password;
      // Jwt payload create
      const payload = {
        id: findAdmin.id,
        email: findAdmin.email,
        type: 'Admin',
      };
      // Generate JWT token for the admin
      const jwtToken = this.authService.generateAuthToken(payload);

      // Return successful response with admin details and JWT token
      return res.status(statusOk).json(
        successResponse(statusOk, SUCCESS_MSG, {
          ...findAdmin,
          access_token: jwtToken,
        }),
      );
    } catch (error) {
      // If any error occurs, throw a custom "Unknown Error" with the error message and status
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  ///-----------------ADMIN-LOGOUT----------------
  async adminlogout(id: string, response: Response) {
    try {
      // Check if email format is invalid
      const findAdminResult = await this.findExistingid(Number(id));
      // Check if admin user not found
      if (!findAdminResult.status) {
        // Admin not found, throw a not found exception
        throw TypeExceptions.NotFoundCommMsg(ADMIN_NOT_FOUND);
      }

      // Return successful response admin logout
      return response
        .status(statusOk)
        .json(successResponse(statusOk, ADMIN_LOGOUT_SUCC, {}));
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  /**
   * Create admin initial user function api
   */
  async createAdminInitialUser() {
    try {
      // Initial user data to be inserted
      const insertObj = {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        mobile_number: 7778954654,
        name: 'Super Admin',
        is_active: true,
      };
      // Check if initial user is already loaded
      const findAdminResult = await this.findExistingEmail(insertObj.email);

      if (findAdminResult.status) {
        // Initial user already loaded, log a message and return
        return this.loggerService.customLog('Initial user already loaded.');
      }

      // Hash the password before inserting
      const hash = await bcryptPassword(
        ADMIN_PASSWORD,
        Number(process.env.PASSWORD_SALT),
      );

      // Create the initial user in the database
      insertObj.password = hash;

      // Log the success message
      const createAdmin = this.adminModel.create(insertObj);
      // Save the entity to the database and get the saved instance with the assigned id
      await this.adminModel.save(createAdmin);

      this.loggerService.log('Initial user loaded successfully.');
    } catch (error) {
      // If any error occurs, throw a custom "Unknown Error" with the error message and status
      throw CustomError.UnknownError(error?.message);
    }
  }

  async findExistingEmail(email: string) {
    // Execute the query to find the admin
    const findAdmin = await this.adminModel.findOne({
      where: { email: email, is_active: true },
    });
    if (findAdmin) {
      // Admin was found, return success status and admin details
      return {
        status: true,
        adminDetails: findAdmin,
      };
    }

    // Admin was not found, return failure status and null admin details
    return {
      status: false,
      adminDetails: null,
    };
  }

  async findExistingid(id: number) {
    let findAdmin;
    if (id !== null) {
      const queryCondition: AdminCommonInterface = {};

      if (typeof id === 'number' || !isNaN(Number(id))) {
        // Search by ID if the input can be converted to a number
        queryCondition.id = Number(id);
      }
      // Execute the query to find the admin
      queryCondition.is_active = true;

      // Execute the query to find the admin
      findAdmin = await this.adminModel.findOne({
        where: queryCondition,
      });
    }
    // Admin was not found, return failure status and null admin details
    if (findAdmin) {
      // Admin was found, return success status and admin details
      return {
        status: true,
        adminDetails: findAdmin,
      };
    }

    // Admin was not found, return failure status and null admin details
    return {
      status: false,
      adminDetails: null,
    };
  }
}
