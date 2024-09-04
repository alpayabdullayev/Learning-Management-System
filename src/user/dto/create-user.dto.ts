import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { RolesEnum } from '../../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'Alpay',
  })
  @Length(2, 30, {
    message: 'The name must be at least 2 but not longer than 30 characters',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Abdullayev',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'alpay@example.com',
  })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @ApiProperty({
    description: 'The role assigned to the user',
    example: 'student',
    enum: RolesEnum,
  })
  @IsNotEmpty()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @ApiProperty({
    description: 'The password for the user',
    example: 'password123',
  })
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @ApiProperty({
    description: 'The status of the user account',
    example: true,
    required: false,
  })
  @IsOptional()
  isActive?: boolean;
}
