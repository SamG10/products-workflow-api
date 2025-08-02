import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProducts1754080125864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Extension pour uuid_generate_v4 (PostgreSQL) - doit être créée en premier
    await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
        `);

    await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(500),
                "price" numeric NOT NULL,
                "stock" integer NOT NULL,
                CONSTRAINT "PK_products_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
