import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Param, Get } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesEnum } from '../enum/role.enum';
import { GroupEntity } from './entities/group.entity';
import { AddStudentDto } from './dto/add-student.dto';

@Controller('group')
@ApiTags('Groups')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN) 
  @ApiOkResponse({
    description: 'Group successfully created',
    type: GroupEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of all groups',
    type: [GroupEntity], 
  })
  async findAll(): Promise<GroupEntity[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN) 
  @ApiOkResponse({
    description: 'Group details retrieved successfully',
    type: GroupEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Group not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findOne(@Param('id') id: number): Promise<GroupEntity> {
    return this.groupService.findOne(id);
  }

  @Post(':id/add-students')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOkResponse({
    description: 'Students successfully added to the group',
    type: GroupEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Group or students not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async addStudentsToGroup(
    @Param('id') groupId: number,
    @Body() addStudentDto: AddStudentDto, 
  ): Promise<GroupEntity> {
    return this.groupService.addStudent(groupId, addStudentDto.studentIds);
  }
}
