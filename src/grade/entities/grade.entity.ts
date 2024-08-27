import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

import { ApiProperty } from "@nestjs/swagger";
import { TaskEntity } from "../../task/entities/task.entity";
import { StudentEntity } from "../../students/entities/student.entity";

@Entity('grades')
export class GradeEntity extends BaseEntity {
    @ApiProperty()
    @Column({ type: 'float', name: 'grade', nullable: false })
    grade: number;

    @ApiProperty({ type: () => TaskEntity })
    @ManyToOne(() => TaskEntity, (task) => task.grades, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'task_id' })
    task: TaskEntity;

    @ApiProperty({ type: () => StudentEntity })
    @ManyToOne(() => StudentEntity, student => student.grades, { nullable: false })
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;
}
