import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

import { ApiProperty } from "@nestjs/swagger";
import { GroupEntity } from "../../group/entities/group.entity";
import { TeacherEntity } from "../../teacher/entities/teacher.entity";
import { GradeEntity } from "../../grade/entities/grade.entity";

@Entity('tasks')
export class TaskEntity extends BaseEntity {
    @ApiProperty()
    @Column({ type: 'varchar', name: 'task_name', nullable: false })
    taskName: string;

    @ApiProperty()
    @Column({ type: 'text', name: 'description', nullable: true })
    description?: string;

    @ApiProperty()
    @Column({ type: 'date', name: 'due_date', nullable: false })
    dueDate: Date;

    @ApiProperty({ type: () => GroupEntity })
    @ManyToOne(() => GroupEntity, group => group.tasks, { nullable: false })
    @JoinColumn({ name: 'group_id' })
    group: GroupEntity;

    @ApiProperty({ type: () => TeacherEntity })
    @ManyToOne(() => TeacherEntity, teacher => teacher.tasks, { nullable: false })
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @ApiProperty()
    @OneToMany(() => GradeEntity, grade => grade.task)
    grades: GradeEntity[];
}
