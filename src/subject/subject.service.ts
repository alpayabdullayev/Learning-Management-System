import { InjectRepository } from "@nestjs/typeorm";
import { SubjectEntity } from "./entities/subject.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateSubjectDto } from "./dto/create-subject.dto";


@Injectable()
export class SubjectService {
    constructor (
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
    ){}

    async create(createSubjectDto: CreateSubjectDto): Promise<SubjectEntity> {
        const newSubject = this.subjectRepository.create(createSubjectDto);
        return this.subjectRepository.save(newSubject);
      }

      async findAll(): Promise<SubjectEntity[]> {
        return await this.subjectRepository.find();
      }
}
