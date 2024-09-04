import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1724858551582 implements MigrationInterface {
    name = 'InitialSchema1724858551582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'student', "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task_name" character varying NOT NULL, "description" text, "due_date" date NOT NULL, "group_id" integer NOT NULL, "teacher_id" integer NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "grade" double precision NOT NULL, "task_id" integer, "student_id" integer NOT NULL, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "group_id" integer, CONSTRAINT "REL_fb3eff90b11bddf7285f9b4e28" UNIQUE ("user_id"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "group_name" character varying NOT NULL, "description" text, "subject_id" integer NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_4668d4752e6766682d1be0b346" UNIQUE ("user_id"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_teacher" ("group_id" integer NOT NULL, "teacher_id" integer NOT NULL, CONSTRAINT "PK_5992556bd76622f724fd45d5df0" PRIMARY KEY ("group_id", "teacher_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d204aadd6e1b42c7ca25e6147b" ON "group_teacher" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9f45286359ee8e90c6972ee5b" ON "group_teacher" ("teacher_id") `);
        await queryRunner.query(`CREATE TABLE "group_student" ("group_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_5c75bfec3b2796ddcea5c866e51" PRIMARY KEY ("group_id", "student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_27d7112293e241abb4bc062817" ON "group_student" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9661293655e3a9917f89fc2de3" ON "group_student" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_438e3c81c9f4209c13483661157" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4c24d8ab916d2f1421efb053287" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_3b0dc94901f98b663be4c98ef69" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_9acca493883cee3b9e8f9e01cd1" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_9e8acf6ea1f157f77e9571bbcf6" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_teacher" ADD CONSTRAINT "FK_d204aadd6e1b42c7ca25e6147b9" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_teacher" ADD CONSTRAINT "FK_f9f45286359ee8e90c6972ee5ba" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_student" ADD CONSTRAINT "FK_27d7112293e241abb4bc062817a" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_student" ADD CONSTRAINT "FK_9661293655e3a9917f89fc2de3f" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_student" DROP CONSTRAINT "FK_9661293655e3a9917f89fc2de3f"`);
        await queryRunner.query(`ALTER TABLE "group_student" DROP CONSTRAINT "FK_27d7112293e241abb4bc062817a"`);
        await queryRunner.query(`ALTER TABLE "group_teacher" DROP CONSTRAINT "FK_f9f45286359ee8e90c6972ee5ba"`);
        await queryRunner.query(`ALTER TABLE "group_teacher" DROP CONSTRAINT "FK_d204aadd6e1b42c7ca25e6147b9"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_9e8acf6ea1f157f77e9571bbcf6"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_9acca493883cee3b9e8f9e01cd1"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_3b0dc94901f98b663be4c98ef69"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4c24d8ab916d2f1421efb053287"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_438e3c81c9f4209c13483661157"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9661293655e3a9917f89fc2de3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27d7112293e241abb4bc062817"`);
        await queryRunner.query(`DROP TABLE "group_student"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9f45286359ee8e90c6972ee5b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d204aadd6e1b42c7ca25e6147b"`);
        await queryRunner.query(`DROP TABLE "group_teacher"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
