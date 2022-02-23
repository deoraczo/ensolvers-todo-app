import { Test, TestingModule } from "@nestjs/testing";
import { GuidVO } from "src/modules/shared/guid.vo";
import { DatabaseModule } from "../../../database/database.module";
import { TaskingModule } from "../tasking.module";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.respository";
import { TypeOrmTaskRespository } from "./typeorm-task.repository";

describe('TypeOrmTaskRepository', () => {
  let taskRepository: TaskRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TaskingModule
      ]
    }).compile();

   
    taskRepository = module.get<TypeOrmTaskRespository>(TaskRepository);
  });

  it('should save a task in database', async () => {
    const task = Task.create(GuidVO.random().value, 'Task created')
    await taskRepository.save(task)
    expect.assertions(0)
  })

})