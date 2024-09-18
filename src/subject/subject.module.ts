import { forwardRef, Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity]),
    forwardRef(() => AuthModule), 
  ],
  providers: [SubjectService],
  controllers: [SubjectController]
})
export class SubjectModule {}
