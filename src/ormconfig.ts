import { ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + './src/database/migrations/**/*{.ts,.js}'],
  cli: {
      migrationsDir: './src/database/migrations',
  }
}

export = ormConfig