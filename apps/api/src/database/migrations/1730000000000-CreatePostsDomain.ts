import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsDomain1730000000000 implements MigrationInterface {
  name = 'CreatePostsDomain1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "code" text,
        "thumbnail_url" character varying,
        "tags" text[] NOT NULL DEFAULT '{}',
        "author_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_posts" PRIMARY KEY ("id"),
        CONSTRAINT "FK_posts_author" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "likes" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "post_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_likes" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_likes_post_user" UNIQUE ("post_id", "user_id"),
        CONSTRAINT "FK_likes_post" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_likes_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "post_id" uuid NOT NULL,
        "author_id" uuid NOT NULL,
        "body" text NOT NULL,
        "parent_id" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_comments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_comments_post" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_comments_author" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_comments_parent" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "posts"
      ADD COLUMN IF NOT EXISTS "search_vector" tsvector
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION posts_search_vector_update()
      RETURNS trigger AS $$
      BEGIN
        NEW.search_vector :=
          to_tsvector(
            'portuguese',
            coalesce(NEW.title, '') || ' ' ||
            coalesce(NEW.description, '') || ' ' ||
            coalesce(array_to_string(NEW.tags, ' '), '')
          );
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql
    `);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS posts_search_vector_trigger ON "posts"
    `);

    await queryRunner.query(`
      CREATE TRIGGER posts_search_vector_trigger
      BEFORE INSERT OR UPDATE ON "posts"
      FOR EACH ROW
      EXECUTE FUNCTION posts_search_vector_update()
    `);

    await queryRunner.query(`
      UPDATE "posts"
      SET "search_vector" = to_tsvector(
        'portuguese',
        coalesce("title", '') || ' ' ||
        coalesce("description", '') || ' ' ||
        coalesce(array_to_string("tags", ' '), '')
      )
      WHERE "search_vector" IS NULL
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_posts_search_vector"
      ON "posts" USING GIN ("search_vector")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_posts_created_at"
      ON "posts" ("created_at" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_likes_post_id"
      ON "likes" ("post_id")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_comments_post_id"
      ON "comments" ("post_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS posts_search_vector_trigger ON "posts"`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS posts_search_vector_update()`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "comments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "likes"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "posts"`);
  }
}
