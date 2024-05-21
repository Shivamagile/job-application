import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  GenderEnum,
  TechnicalExperienceEnum,
  UniversityEnum,
} from 'src/common/helpers/enum.helper';

export class EducationDto {
  @ApiProperty({ example: 'SSC', required: true })
  @IsEnum(UniversityEnum)
  @IsNotEmpty()
  degree: UniversityEnum;

  @ApiProperty({ example: 'Gujarat Secondary' })
  @IsNotEmpty()
  @IsString()
  boardUniversity: string;

  @ApiProperty({ example: '2021' })
  @IsNumber()
  @IsNotEmpty()
  year: string;

  @ApiProperty({ example: '8' })
  @IsString()
  @IsNotEmpty()
  cgpaPercentage: string;
}

export class WorkExperienceDto {
  @ApiProperty({ example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'Devleoper' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  from?: Date; //date

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  to?: Date; //date

  // @ApiProperty({ example: '2023-08-04' })
  // @IsDate()
  // @IsNotEmpty()
  // @Type(() => Date)
  // from: Date;

  // @ApiProperty({ example: '2023-08-08' })
  // @IsDate()
  // @IsNotEmpty()
  // @Type(() => Date)
  // to: Date;
}

export class knownLanguagesDto {
  @ApiProperty({ example: 'English' })
  @IsString()
  @IsNotEmpty()
  language_name: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  read: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  write: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  speak: boolean;
}

export class TechnicalExperienceDto {
  @ApiProperty({ example: 'nodeJs' })
  @IsNotEmpty()
  technology: string;

  @ApiProperty({ example: 'expert' })
  @IsEnum(TechnicalExperienceEnum)
  @IsNotEmpty()
  level: TechnicalExperienceEnum;
}

export class CreateJobApplicationDto {
  @ApiProperty({ example: 'suresh raina' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'suresh@yopmsil.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'xzy' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  @IsString()
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiProperty({ example: 7778947587 })
  @IsNotEmpty()
  @IsNumber()
  contact: number;

  @ApiProperty({ required: true, type: [EducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @IsNotEmpty()
  educationDetails: [EducationDto];

  @ApiProperty({ type: [WorkExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  @IsNotEmpty()
  workExperience: [WorkExperienceDto];

  @ApiProperty({ type: [knownLanguagesDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => knownLanguagesDto)
  @IsNotEmpty()
  knownLanguages: [knownLanguagesDto];

  @ApiProperty({ type: [TechnicalExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalExperienceDto)
  @IsNotEmpty()
  technicalExperience: [TechnicalExperienceDto];

  @ApiProperty({ example: 'Ahmedabad' })
  @IsString()
  @IsNotEmpty()
  preferredLocation: string;

  @ApiProperty({ example: '650000' })
  @IsNumber()
  @IsNotEmpty()
  expectedCTC: number;

  @ApiProperty({ example: '450000' })
  @IsNumber()
  @IsNotEmpty()
  currentCTC: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  noticePeriod: number;
}
