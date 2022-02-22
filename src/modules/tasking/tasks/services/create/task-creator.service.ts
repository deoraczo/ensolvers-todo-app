import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../../task.entity';
import { TaskRepository } from '../../task.respository';
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TaskCreatorService {

  constructor(@Inject(TaskRepository) private readonly taskRepository: TaskRepository) {}

  async create(dto: CreateTaskDTO): Promise<void> {
    const task = Task.cretea(dto.id, dto.title)
    await this.taskRepository.save(task)
  }
}
