import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { TeacherEntity } from '../teacher/entities/teacher.entity';
import { StudentEntity } from '../students/entities/student.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { TaskEntity } from '../task/entities/task.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,

    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,


    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,

    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,


  ) {}

  private async _checkId(id: number): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({ where: { id },relations:["stundents"] });
  
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
  
    return group;
  }

  async create(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const { groupName, description, subjectId, teachers } =
      createGroupDto;

    const existingGroup = await this.groupRepository.findOne({
      where: { groupName },
    });
    if (existingGroup) {
        throw new HttpException('This email is already registered', HttpStatus.CONFLICT);
    }

    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new Error(`Subject with id ${subjectId} not found`);
    }

    const teacherEntities = teachers ? await this.teacherRepository.find({
        where: { id: In(teachers) }
      }) : [];
      
      

    const group = this.groupRepository.create({
      groupName,
      description,
      subjectId,
      category: subject,
      teachers: teacherEntities,
    });

    return this.groupRepository.save(group);
  }

  async addStudent(groupId: number, studentIds: number[]): Promise<GroupEntity> {
    const group = await this._checkId(groupId);
  
    const studentsToAdd = await this.studentRepository.find({
      where: { id: In(studentIds) },
    });
  
    if (studentsToAdd.length === 0) {
      throw new NotFoundException(`No students found with the provided IDs`);
    }
  
    const existingStudentIds = new Set(group.stundents.map(student => student.id));
  
    const filteredStudentsToAdd = studentsToAdd.filter(
      student => !existingStudentIds.has(student.id)
    );
  
    group.stundents = [...group.stundents, ...filteredStudentsToAdd];
  
    return this.groupRepository.save(group);
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.find({
        relations: ['stundents'],
      });
  }

  async findOne(id: number): Promise<GroupEntity> {
    return this._checkId(id);
  }

  
}
