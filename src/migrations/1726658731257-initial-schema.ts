import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1726658731257 implements MigrationInterface {
    name = 'InitialSchema1726658731257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "UQ_ef10d4611e4f355d10ecaa10ac6" UNIQUE ("group_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "UQ_ef10d4611e4f355d10ecaa10ac6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    }

}
