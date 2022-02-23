import { Controller, Delete, Param } from "@nestjs/common";
import { TaskDeleterService } from "../services/delete/task-deleter.service";

@Controller('tasks')
export class DeletTaskController {
  
  constructor(private readonly taskDeleter: TaskDeleterService) {}

  @Delete(':taskId')
  async invoke(@Param('taskId') taskId: string) {
    await this.taskDeleter.delete(taskId)

    return {
      message: 'Task deleted successfully'
    }
  }
}