import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ description: 'User ID associated with the teacher' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Groups assigned to the teacher', required: false })
  @IsArray()
  @IsOptional()
  groupIds?: string[];

  @ApiProperty({ description: 'Tasks assigned to the teacher', required: false })
  @IsArray()
  @IsOptional()
  taskIds?: string[];
}