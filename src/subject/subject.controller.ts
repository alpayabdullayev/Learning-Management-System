import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
  } from '@nestjs/common';
  import { SubjectService } from './subject.service';
  import { CreateSubjectDto } from './dto/create-subject.dto';
  import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from '../auth/guard/auth.guard';
  import { RolesGuard } from '../auth/guard/role.guard';
  import { Roles } from '../auth/decorators/role.decorator';
  import { RolesEnum } from '../enum/role.enum';
  import { SubjectEntity } from './entities/subject.entity';
  
  @Controller('subject')
  @ApiTags('Subjects')
  @UseGuards(AuthGuard) 
  @ApiBearerAuth('JWT-auth')
  export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}
  
    @Post()
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOkResponse({
      description: 'Subject successfully created',
      type: SubjectEntity,
    })
    @ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Conflict while creating the subject',
    })
    @ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    })
    async create(@Body() createSubjectDto: CreateSubjectDto) {
      return this.subjectService.create(createSubjectDto);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard) 
    @Roles(RolesEnum.ADMIN) 
    @ApiOkResponse({
      description: 'List of all subjects',
      type: [SubjectEntity],
    })
    findAll() {
      return this.subjectService.findAll();
    }
  }
  