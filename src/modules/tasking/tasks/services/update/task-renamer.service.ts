import { Inject, Injectable } from "@nestjs/common";
import { Not } from "typeorm";
import { TaskEmailAlreadyExistsException } from "../../exceptions/task-email-already-exists.exception";
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
    await this.ensureTitleDoesNotExists(id, dto.title, this.taskRepository)
    const renamedTask = task.renameTitle(dto.title)
    await this.taskRepository.save(renamedTask)
  }

  private async ensureTitleDoesNotExists(id: string, title: string, taskRepository: TaskRepository): Promise<void> {
    const taskExists = await taskRepository.match({ title, id: Not(id) })
    if (taskExists) {
      throw new TaskEmailAlreadyExistsException(`Task whit title=${title} already exists`)
    }
  }
}