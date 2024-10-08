import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from '../common/base.entity';
import { RolesEnum } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'surname', nullable: false })
  surname: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'email', nullable: false,unique: true})
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    name: 'role',
    default: RolesEnum.STUDENT,
    nullable: false,
  })
  role: RolesEnum;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'boolean', name: 'status', default: true })
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  passwordBcrypt() {
    if (this.password) {
      this.password = bcrypt.hashSync(
        this.password,
        Number(process.env.PASWORD_SALT),
      );
    }
  }
}
