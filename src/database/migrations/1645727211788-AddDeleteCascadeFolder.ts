import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeleteCascadeFolder1645727211788 implements MigrationInterface {
    name = 'AddDeleteCascadeFolder1645727211788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_7c9d3eb0617e9b3f52c74d43c2b\``);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD \`updated_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_7c9d3eb0617e9b3f52c74d43c2b\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folder\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_7c9d3eb0617e9b3f52c74d43c2b\``);
        await queryRunner.query(`ALTER TABLE \`folder\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_7c9d3eb0617e9b3f52c74d43c2b\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
