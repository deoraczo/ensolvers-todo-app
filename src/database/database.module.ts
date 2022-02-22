import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from 'src/config';
import ormConfig from 'src/ormconfig';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true
    })
  ]
})
export class DatabaseModule {}
