import { Column, Entity, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { StudentEntity } from "../../students/entities/student.entity";
import { TeacherEntity } from "../../teacher/entities/teacher.entity";
import { TaskEntity } from "../../task/entities/task.entity";
import { SubjectEntity } from "../../subject/entities/subject.entity";

@Entity('groups')
export class GroupEntity extends BaseEntity {
    @ApiProperty()
    @Column({ type: 'varchar', name: 'group_name', nullable: false,unique: true  })
    groupName: string;

    @ApiProperty()
    @Column({ type: 'text', name: 'description', nullable: true })
    description?: string;

    @ApiProperty({ type: () => SubjectEntity })
    @ManyToOne(() => SubjectEntity, x => x.groups, { onDelete: "CASCADE" })
    @JoinColumn({ name: "subject_id" })
    category: SubjectEntity

    @Column({ nullable: false, name: 'subject_id' })
    public subjectId: number

    @ManyToMany(() => TeacherEntity, teacher => teacher.groups, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinTable({
        name: 'group_teacher',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id',
        },
    })
    public teachers: TeacherEntity[];

    @ManyToMany(() => StudentEntity, student => student.group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinTable({
        name: 'group_student',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
        },
    })
    public stundents: StudentEntity[];

    @ApiProperty()
    @OneToMany(() => TaskEntity, x => x.group, { cascade: true })
    tasks: TaskEntity[]
}
