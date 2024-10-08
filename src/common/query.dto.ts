import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SORT_TYPE } from '../enum/sort.enum';

export class CommonQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number = 8;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sort: SORT_TYPE = SORT_TYPE.DESC;

  @ApiProperty()
  @IsOptional()
  @IsString()
  orderBY: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  searchText: string;
}
