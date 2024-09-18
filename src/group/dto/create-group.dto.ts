import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsInt } from 'class-validator';


export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the Group',
    example: 'FE101',
  })
  @IsNotEmpty({ message: 'The name is required' })
  @IsString()
  groupName: string;

  @ApiProperty({
    description: 'The description of the Group',
    example: 'Introduction to Frontend Engineering',
    required: false,
    
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the related subject',
    example: 1,
  })
  @IsNotEmpty({ message: 'The subjectId is required' })
  @IsInt()
  subjectId: number;

  @ApiProperty({
    description: 'The list of teacher IDs',
    example: [1, 2],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  teachers?: number[];

  @ApiProperty({
    description: 'The list of student IDs',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  students?: number[];

  @ApiProperty({
    description: 'The list of task IDs',
    example: [1, 2],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  tasks?: number[];
}
