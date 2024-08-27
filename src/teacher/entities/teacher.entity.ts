import { Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { UserEntity } from "../../user/user.entity";

import { ApiProperty } from "@nestjs/swagger";
import { GroupEntity } from "../../group/entities/group.entity";
import { TaskEntity } from "../../task/entities/task.entity";

@Entity('teachers')
export class TeacherEntity extends BaseEntity {
    @ApiProperty()
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ApiProperty()
    @OneToMany(() => GroupEntity, group => group.teachers)
    groups: GroupEntity[];

    @ApiProperty()
    @OneToMany(() => TaskEntity, task => task.teacher)
    tasks: TaskEntity[];
}
