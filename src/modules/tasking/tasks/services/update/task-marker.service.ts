import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../task.respository";
import { TaskFinderService } from "../find/task-finder.service";

@Injectable()
export class TaskMarkerService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly taskFinder: TaskFinderService
  ) {}

  async mark(taskId: string): Promise<void> {
    const task = await this.taskFinder.find(taskId)
    const markedTask = task.mark()
    await this.taskRepository.save(markedTask)
  }
}