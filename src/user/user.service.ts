import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { RolesEnum } from '../enum/role.enum';
import { TeacherService } from '../teacher/teacher.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly teacherService: TeacherService,
    private readonly studentsService: StudentsService,
  ) {}

  async _checkEmail(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !!existingUser;
  }

  async create(body: Partial<UserEntity>) {
    if (await this._checkEmail(body.email)) {
      throw new HttpException('This email is already registered', HttpStatus.CONFLICT);
    }

    const user = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(user);

    if (savedUser.role === RolesEnum.TEACHER) {
      await this.teacherService.create(savedUser);
    } else if (savedUser.role === RolesEnum.STUDENT) {
      await this.studentsService.create(savedUser);
    }

    return savedUser;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
