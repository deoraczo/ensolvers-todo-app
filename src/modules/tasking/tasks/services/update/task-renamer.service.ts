import { Inject, Injectable } from "@nestjs/common";
import { Task } from "../../task.entity";
import { TaskRepository } from "../../task.respository";
import { TaskFinderService } from "../find/task-finder.service";
import { RenameTaskDTO } from "./rename-task.dto";

@Injectable()
export class TaskRenamerService {
  constructor(
    @Inject(TaskRepository) 
    private readonly taskRepository: TaskRepository,
    private readonly taskFinder: TaskFinderService
  ){}

  async rename(id: string, dto: RenameTaskDTO): Promise<void> {
    const task = await this.taskFinder.find(id)
    const renamedTask = task.renameTitle(dto.title)
    await this.taskRepository.save(renamedTask)
  }
}