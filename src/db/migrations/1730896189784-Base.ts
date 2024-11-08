import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1730896189784 implements MigrationInterface {
    name = 'Base1730896189784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" RENAME COLUMN "collectionId" TO "publicationId"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "publicationId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subsection" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subsection" ADD "publicationId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsection" DROP COLUMN "publicationId"`);
        await queryRunner.query(`ALTER TABLE "subsection" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "publicationId"`);
        await queryRunner.query(`ALTER TABLE "section" RENAME COLUMN "publicationId" TO "collectionId"`);
    }

}
