import { MigrationInterface, QueryRunner } from "typeorm";

export class initialDatabase1673104526515 implements MigrationInterface {
    name = 'initialDatabase1673104526515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app"."tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app"."tag_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectId" uuid NOT NULL, "tagId" uuid NOT NULL, "count" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_5c6caa40bc14aa4dc602751ce49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app"."project_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectId" uuid NOT NULL, "firstAnswerId" uuid NOT NULL, "secondAnswerId" uuid NOT NULL, "count" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_7b5ef923d107f677fcc88eb4433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "published" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app"."question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "projectId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app"."answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "questionId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app"."tag_link" ADD CONSTRAINT "FK_c5c488aeb6e780a027aca166156" FOREIGN KEY ("projectId") REFERENCES "app"."tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."tag_link" ADD CONSTRAINT "FK_dbea28c149de8624272b2ec5f1b" FOREIGN KEY ("tagId") REFERENCES "app"."tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" ADD CONSTRAINT "FK_ff1021a1ea54de9e9736ca4a011" FOREIGN KEY ("projectId") REFERENCES "app"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" ADD CONSTRAINT "FK_2cf1c076ef83c263467ccc1e3b3" FOREIGN KEY ("firstAnswerId") REFERENCES "app"."answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" ADD CONSTRAINT "FK_eb0ee81ba364aa7f264c62f703a" FOREIGN KEY ("secondAnswerId") REFERENCES "app"."answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."question" ADD CONSTRAINT "FK_04a6b839e7c50175802652de8e6" FOREIGN KEY ("projectId") REFERENCES "app"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app"."answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "app"."question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app"."answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "app"."question" DROP CONSTRAINT "FK_04a6b839e7c50175802652de8e6"`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" DROP CONSTRAINT "FK_eb0ee81ba364aa7f264c62f703a"`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" DROP CONSTRAINT "FK_2cf1c076ef83c263467ccc1e3b3"`);
        await queryRunner.query(`ALTER TABLE "app"."project_response" DROP CONSTRAINT "FK_ff1021a1ea54de9e9736ca4a011"`);
        await queryRunner.query(`ALTER TABLE "app"."tag_link" DROP CONSTRAINT "FK_dbea28c149de8624272b2ec5f1b"`);
        await queryRunner.query(`ALTER TABLE "app"."tag_link" DROP CONSTRAINT "FK_c5c488aeb6e780a027aca166156"`);
        await queryRunner.query(`DROP TABLE "app"."answer"`);
        await queryRunner.query(`DROP TABLE "app"."question"`);
        await queryRunner.query(`DROP TABLE "app"."project"`);
        await queryRunner.query(`DROP TABLE "app"."project_response"`);
        await queryRunner.query(`DROP TABLE "app"."tag_link"`);
        await queryRunner.query(`DROP TABLE "app"."tag"`);
    }

}
