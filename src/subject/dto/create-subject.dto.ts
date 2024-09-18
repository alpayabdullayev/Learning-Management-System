import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { GroupEntity } from '../../group/entities/group.entity';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'The name of the subject',
    example: 'Front-End',
  })
  @IsNotEmpty({ message: 'The name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The groups associated with the subject',
    type: [GroupEntity],
    example: [],
    required: false,
  })
  @IsOptional()
  @IsArray()
  groups?: GroupEntity[];
}