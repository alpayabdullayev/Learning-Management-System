import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { GroupEntity } from "../../group/entities/group.entity";

@Entity('subjects')
export class SubjectEntity extends BaseEntity {
    @ApiProperty()
    @Column({ type: 'varchar', name: 'name', nullable: false })
    name: string;

    @ApiProperty()
    @OneToMany(() => GroupEntity, group => group.subjectId)
    groups: GroupEntity[];
}
