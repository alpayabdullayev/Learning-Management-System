import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentsModule } from './students/students.module';
import { TaskModule } from './task/task.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grade/grade.module';

import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, '/**/*.entity{.js,.ts}')],
      }),
    }),
    UserModule,
    GroupModule,
    TeacherModule,
    StudentsModule,
    TaskModule,
    SubjectModule,
    GradeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
