import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1725212238882 implements MigrationInterface {
    name = 'Initial1725212238882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_salt" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_a09fe9fafcc4239909d1a586763" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_passcode" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "passcode" character varying NOT NULL, CONSTRAINT "PK_36fd49868e859fe76ccda878a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "storedSaltId" integer, "storedPasscodeId" integer, CONSTRAINT "REL_e49878aac118d46005002fb450" UNIQUE ("storedSaltId"), CONSTRAINT "REL_f1d0e4f51f4b65865efda92565" UNIQUE ("storedPasscodeId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "sectionId" integer NOT NULL, "subsectionId" integer NOT NULL, "name" character varying NOT NULL, "content" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "collectionId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subsection" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sectionId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aebbb84e28d5deec5bc853b9f0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication_settings" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "publicationId" integer NOT NULL, "heroImage" character varying NOT NULL, "badgeImage" character varying NOT NULL, "primaryColor" character varying NOT NULL, "secondaryColor" character varying NOT NULL, "buttonColor" character varying NOT NULL, "textColor" character varying NOT NULL, "textType" character varying NOT NULL, "domainName" character varying NOT NULL, CONSTRAINT "PK_47b01c90a7b32ff4fdb8707ee63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e49878aac118d46005002fb450e" FOREIGN KEY ("storedSaltId") REFERENCES "user_salt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f1d0e4f51f4b65865efda925655" FOREIGN KEY ("storedPasscodeId") REFERENCES "user_passcode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "FK_e74cda52eb949d20e977b23ce26" FOREIGN KEY ("subsectionId") REFERENCES "subsection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subsection" ADD CONSTRAINT "FK_a5185d9a88484c25bbe57b89556" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsection" DROP CONSTRAINT "FK_a5185d9a88484c25bbe57b89556"`);
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_e74cda52eb949d20e977b23ce26"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f1d0e4f51f4b65865efda925655"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e49878aac118d46005002fb450e"`);
        await queryRunner.query(`DROP TABLE "publication_settings"`);
        await queryRunner.query(`DROP TABLE "publication"`);
        await queryRunner.query(`DROP TABLE "subsection"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "page"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_passcode"`);
        await queryRunner.query(`DROP TABLE "user_salt"`);
    }

}
