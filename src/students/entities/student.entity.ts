import { Entity, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { UserEntity } from "../../user/user.entity"
import { ApiProperty } from "@nestjs/swagger";
import { GroupEntity } from "../../group/entities/group.entity";
import { GradeEntity } from "../../grade/entities/grade.entity";

@Entity('students')
export class StudentEntity extends BaseEntity {
    @ApiProperty()
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ApiProperty({ type: () => GroupEntity })
    @ManyToOne(() => GroupEntity, x => x.stundents, { onDelete: "CASCADE" })
    @JoinColumn({ name: "group_id" })
    group: GroupEntity

    @ApiProperty()
    @OneToMany(() => GradeEntity, grade => grade.student)
    grades: GradeEntity[];
}
