import { Test, TestingModule } from '@nestjs/testing';
import { GuidVO } from '../../../../shared/guid.vo';
import { TaskRepositoryMock } from '../../task-repository.mock';
import { Task, TaskStatus } from '../../task.entity';
import { TaskRepository } from '../../task.respository';
import { TaskCreatorService } from './task-creator.service';

describe('TaskCreatorService', () => {
  let taskCreator: TaskCreatorService;
  let taskRepository: TaskRepositoryMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCreatorService,
        {
          provide: TaskRepository,
          useClass: TaskRepositoryMock
        }
      ],
    }).compile();

    taskCreator = module.get<TaskCreatorService>(TaskCreatorService);
    taskRepository = module.get<TaskRepositoryMock>(TaskRepository);

  });

  it('should create a valid task', () => {
    const task = Task.create(GuidVO.random().value, 'First task')

    taskCreator.create(task.id, { title: task.title })
    taskRepository.assertLastSavedTaskIs(task)
  });
});
