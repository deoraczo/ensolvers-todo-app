import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { TaskingModule } from './modules/tasking/tasking.module';

@Module({
  imports: [SharedModule, TaskingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
