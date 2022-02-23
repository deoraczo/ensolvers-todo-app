
import { TypeOrmRepository } from "../../shared/typeorm.repository";
import { EntityRepository, ObjectType } from "typeorm";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.respository";
import { TaskId } from "./task-id";

@EntityRepository(Task)
export class TypeOrmTaskRespository extends TypeOrmRepository<Task> implements TaskRepository {

  protected entity(): ObjectType<Task> {
      return Task;
  }

  async save(task: Task): Promise<void> {
    await this.persist(task)
  }

  async find(taskId: string): Promise<Task> {
    return await this.findById(taskId)
  }

  async findAll(): Promise<Task[]> {
    return await this.search()
  }

  async remove(id: string): Promise<void> {
    await this.delete(id)
  }

  async match(where: object = {}): Promise<Task> {
    return await this.findByMatch(where)
  }
}