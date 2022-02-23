import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../task.respository";
import { TaskFinderService } from "../find/task-finder.service";

@Injectable()
export class TaskDeleterService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly taskFinder: TaskFinderService
  ) { }

  async delete(id: string): Promise<void> {
    await this.taskFinder.find(id)
    await this.taskRepository.remove(id)
  }
}