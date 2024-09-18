import { forwardRef, Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { TeacherEntity } from '../teacher/entities/teacher.entity';
import { TaskEntity } from '../task/entities/task.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { StudentEntity } from '../students/entities/student.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, TeacherEntity, StudentEntity, SubjectEntity, TaskEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
