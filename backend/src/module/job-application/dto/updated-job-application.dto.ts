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

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  year?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cgpaPercentage?: string;
}

export class WorkExperienceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  from?: Date; //date

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to?: Date; //date
}

export class KnownLanguagesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  language_name?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  write?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  speak?: boolean;
}

export class TechnicalExperienceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  technology?: string;

  @ApiProperty()
  @IsEnum(TechnicalExperienceEnum)
  @IsOptional()
  level?: TechnicalExperienceEnum;
}

export class UpdateJobApplicationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  @IsString()
  @IsOptional()
  gender?: GenderEnum;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  contact?: number;

  @ApiProperty({ type: [EducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @IsOptional()
  educationDetails?: EducationDto[];

  @ApiProperty({ type: [WorkExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  @IsOptional()
  workExperience?: WorkExperienceDto[];

  @ApiProperty({ type: [KnownLanguagesDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KnownLanguagesDto)
  @IsOptional()
  knownLanguages?: KnownLanguagesDto[];

  @ApiProperty({ type: [TechnicalExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalExperienceDto)
  @IsOptional()
  technicalExperience?: TechnicalExperienceDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  preferredLocation?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  expectedCTC?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  currentCTC?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noticePeriod?: string;
}
