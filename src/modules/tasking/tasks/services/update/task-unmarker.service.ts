import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../task.respository";
import { TaskFinderService } from "../find/task-finder.service";

@Injectable()
export class TaskUnMarkerService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly taskFinder: TaskFinderService
  ) {}

  async unmark(taskId: string): Promise<void> {
    const task = await this.taskFinder.find(taskId)
    const unmarkedTask = task.unmark()
    await this.taskRepository.save(unmarkedTask)
  }
}