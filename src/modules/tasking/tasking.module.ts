import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [TasksModule, FoldersModule]
})
export class TaskingModule {}
