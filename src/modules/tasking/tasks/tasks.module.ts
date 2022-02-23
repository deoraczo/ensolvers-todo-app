import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './controllers/test.controller';
import { TaskCreatorService } from './services/create/task-creator.service';
import { Task } from './task.entity';
import { TaskRepository } from './task.respository';
import { TypeOrmTaskRespository } from './typeorm-task.repository';
@Module({
  controllers: [
    TestController
  ],
  providers: [
    TaskCreatorService,
    {
      provide: TaskRepository,
      useClass: TypeOrmTaskRespository
    }
  ],
  imports: [
    TypeOrmModule.forFeature([Task], 'connection'),
  ],
  exports: [TypeOrmModule]
})
export class TasksModule {}
