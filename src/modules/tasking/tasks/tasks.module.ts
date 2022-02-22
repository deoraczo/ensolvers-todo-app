import { Module } from '@nestjs/common';
import { TaskCreatorService } from './services/create/task-creator.service';
@Module({
  

  providers: [TaskCreatorService]
})
export class TasksModule {}
