import { Inject } from "@nestjs/common";
import { TaskNotFoundException } from "../../exceptions/task-not-found.exception";
import { TaskId } from "../../task-id";
import { Task } from "../../task.entity";
import { TaskRepository } from "../../task.respository";

export class TaskFinderService {
  constructor(
    @Inject(TaskRepository) private readonly taskRepository: TaskRepository
  ) {}

  async find(taskId: string): Promise<Task> {
    const task = await this.taskRepository.find(taskId)
    if (!task) {
      throw new TaskNotFoundException('Task not found')
    }
    
    return task
  }
}