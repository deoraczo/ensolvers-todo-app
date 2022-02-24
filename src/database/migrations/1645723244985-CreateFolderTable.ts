import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFolderTable1645723244985 implements MigrationInterface {
    name = 'CreateFolderTable1645723244985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`folder\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL, UNIQUE INDEX \`IDX_81e83c553194ea85986a6ca404\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`folder_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_7c9d3eb0617e9b3f52c74d43c2b\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_7c9d3eb0617e9b3f52c74d43c2b\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`folder_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_81e83c553194ea85986a6ca404\` ON \`folder\``);
        await queryRunner.query(`DROP TABLE \`folder\``);
    }

}
