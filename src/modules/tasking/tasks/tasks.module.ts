import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletTaskController } from './controllers/delete-task.controller';
import { GetAllTasksController } from './controllers/get-all-tasks.controller';
import { GetTaskController } from './controllers/get-task.controller';
import { PathMarkTaskController } from './controllers/path-mark-task.controller';
import { PathRenameTaskController } from './controllers/path-rename-task.controller';
import { PathUnMarkTaskController } from './controllers/path-unmark-task.controller';
import { PutTaskController } from './controllers/put-task.controller';
import { TaskCreatorService } from './services/create/task-creator.service';
import { TaskDeleterService } from './services/delete/task-deleter.service';
import { TaskFinderService } from './services/find/task-finder.service';
import { TaskSearcherService } from './services/search/task-searcher.service';
import { TaskMarkerService } from './services/update/task-marker.service';
import { TaskRenamerService } from './services/update/task-renamer.service';
import { TaskUnMarkerService } from './services/update/task-unmarker.service';
import { Task } from './task.entity';
import { TaskRepository } from './task.respository';
import { TypeOrmTaskRespository } from './typeorm-task.repository';
@Module({
  controllers: [
    PutTaskController,
    GetTaskController,
    GetAllTasksController,
    PathRenameTaskController,
    DeletTaskController,
    PathMarkTaskController,
    PathUnMarkTaskController,
  ],
  providers: [
    {
      provide: TaskRepository,
      useClass: TypeOrmTaskRespository
    },
    TaskCreatorService,
    TaskFinderService,
    TaskSearcherService,
    TaskRenamerService,
    TaskDeleterService,
    TaskMarkerService,
    TaskUnMarkerService,
  ],
  imports: [
    TypeOrmModule.forFeature([Task], 'connection'),
  ],
  exports: [TypeOrmModule]
})
export class TasksModule {}
