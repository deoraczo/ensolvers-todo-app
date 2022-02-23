import { Test, TestingModule } from "@nestjs/testing"
import { GuidVO } from "../../../../shared/guid.vo"
import { TaskNotFoundException } from "../../exceptions/task-not-found.exception"
import { Task } from "../../task.entity"
import { TaskRepository } from "../../task.respository"
import { TaskFinderService } from "./task-finder.service"

describe('TaskFinderService', () => {
  let taskFinder: TaskFinderService
  let taskRepository

  const mockTaskRepository = () => ({
    save: jest.fn(),
    find: jest.fn(),
  })


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskFinderService,
        {
          provide: TaskRepository,
          useFactory: mockTaskRepository
        }
      ],
    }).compile();

    taskFinder = module.get<TaskFinderService>(TaskFinderService);
    taskRepository = module.get<TaskRepository>(TaskRepository);

  });  


  it('should find an existing task', async () => {
    const taskMock = Task.create(GuidVO.random().value, 'First task')
    taskRepository.find.mockResolvedValue(taskMock)
    const response = await taskFinder.find(taskMock.id)
    expect(response).toEqual(taskMock)
    expect(taskRepository.find).toHaveBeenCalledWith(taskMock.id);
  })

  it('should throw an exception when task does not exists', async () => {
    taskRepository.find.mockResolvedValue(null)
    expect(taskFinder.find(GuidVO.random().value)).rejects.toThrow(TaskNotFoundException)
  })
})