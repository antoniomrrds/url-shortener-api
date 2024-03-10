import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateShortenedUrls1709810446192 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tbl_shortened_url',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'original_url',
          type: 'varchar'
        },
        {
          name: 'short_url',
          type: 'varchar'
        },
        {
          name: 'access_counter',
          type: 'int'
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          default: 'now()',
          isNullable: false
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
          default: 'now()',
          onUpdate: 'now()',
          isNullable: false
        }
      ]

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_shortened_url')
  }
}
