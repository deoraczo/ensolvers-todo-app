import { Inject, Injectable } from '@nestjs/common';
import { FolderFinderService } from 'src/modules/tasking/folders/services/find/folder-finder.service';
import { TaskEmailAlreadyExistsException } from '../../exceptions/task-email-already-exists.exception';
import { TaskIdAlreadyExistsException } from '../../exceptions/task-id-already-exists.exception';
import { Task } from '../../task.entity';
import { TaskRepository } from '../../task.respository';
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TaskCreatorService {

  constructor(
    @Inject(TaskRepository) private readonly taskRepository: TaskRepository,
    private folderFinder: FolderFinderService,
  ) {}

  async create(taskId: string, dto: CreateTaskDTO): Promise<void> {
    const folder = await this.folderFinder.find(dto.folderId)
    await this.ensureIdUuidDoesNotExists(taskId, this.taskRepository)
    await this.ensureTitleDoesNotExists(dto.title, this.taskRepository)
    const task = Task.create(taskId, dto.title, folder)
    await this.taskRepository.save(task)
  }

  private async ensureIdUuidDoesNotExists(taskId: string, taskRepository: TaskRepository): Promise<void> {
    const taskExists = await taskRepository.find(taskId)
    if (taskExists) {
      throw new TaskIdAlreadyExistsException('Task id already exists')
    }
  }

  private async ensureTitleDoesNotExists(title: string, taskRepository: TaskRepository): Promise<void> {
    const taskExists = await taskRepository.match({ title })
    if (taskExists) {
      throw new TaskEmailAlreadyExistsException(`Task whit title ${title} already exists`)
    }
  }
}
