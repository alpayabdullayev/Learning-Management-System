import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AddStudentDto {
  @ApiProperty({
    description: 'List of student IDs to add to the group',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'studentIds array cannot be empty' })
  @IsInt({ each: true, message: 'Each student ID must be an integer' })
  studentIds: number[];
}
