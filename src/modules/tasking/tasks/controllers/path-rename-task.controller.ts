import { Body, Controller, Param, Patch } from "@nestjs/common";
import { RenameTaskDTO } from "../services/update/rename-task.dto";
import { TaskRenamerService } from "../services/update/task-renamer.service";

@Controller('tasks')
export class PathRenameTaskController {
  constructor(private readonly taskRenamer: TaskRenamerService) {}

  @Patch(':taskId')
  async invoke(@Param('taskId') taskId: string, @Body() dto: RenameTaskDTO) {
    await this.taskRenamer.rename(taskId, dto)
  }
}