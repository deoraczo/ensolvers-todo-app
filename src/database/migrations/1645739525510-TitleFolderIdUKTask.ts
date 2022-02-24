import {MigrationInterface, QueryRunner} from "typeorm";

export class TitleFolderIdUKTask1645739525510 implements MigrationInterface {
    name = 'TitleFolderIdUKTask1645739525510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_067be4bd67747aa64451933929\` ON \`tasks\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`title_folder_id_uk\` ON \`tasks\` (\`title\`, \`folder_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`title_folder_id_uk\` ON \`tasks\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_067be4bd67747aa64451933929\` ON \`tasks\` (\`title\`)`);
    }

}
