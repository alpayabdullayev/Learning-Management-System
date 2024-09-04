import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentsService],
    exports: [TypeOrmModule,StudentsService],
    controllers: [StudentsController],
})
export class StudentsModule {}
