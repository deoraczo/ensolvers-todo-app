import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { TaskingModule } from './modules/tasking/tasking.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Config from './config';
import { enviroments } from './enviroments';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config]
    }),
    SharedModule, 
    TaskingModule, 
    DatabaseModule
  ]
})
export class AppModule {}
