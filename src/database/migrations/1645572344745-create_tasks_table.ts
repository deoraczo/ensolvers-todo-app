import {MigrationInterface, QueryRunner} from "typeorm";

export class createTasksTable1645572344745 implements MigrationInterface {
    name = 'createTasksTable1645572344745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`status\` enum ('DONE', 'PENDING') NOT NULL DEFAULT 'PENDING', \`created_at\` timestamp NOT NULL, UNIQUE INDEX \`IDX_067be4bd67747aa64451933929\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_067be4bd67747aa64451933929\` ON \`tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
