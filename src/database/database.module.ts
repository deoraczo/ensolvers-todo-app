import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from 'src/config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [Config.KEY],
      useFactory: (configService: ConfigType<typeof Config>) => {
        const {
          type,
          host,
          port,
          name,
          user,
          password
        } = configService.database

        return {
          type: 'mysql',
          host,
          port,
          database: name,
          username: user,
          password,
          autoLoadEntities: true,
          synchronize: false
        }
      }
    })
  ]
})
export class DatabaseModule {}
