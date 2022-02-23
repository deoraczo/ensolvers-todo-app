import { Inject } from "@nestjs/common";
import { Task } from "../../task.entity";
import { TaskRepository } from "../../task.respository";

export class TaskSearcherService {
  constructor(
    @Inject(TaskRepository) private readonly taskRepository: TaskRepository
  ) {}

  async search(): Promise<Task[]> {
    return await this.taskRepository.findAll()
  }
}