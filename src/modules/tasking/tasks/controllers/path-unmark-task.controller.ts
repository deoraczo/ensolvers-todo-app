import { Controller, Param, Patch } from "@nestjs/common";
import { TaskUnMarkerService } from "../services/update/task-unmarker.service";

@Controller('tasks')
export class PathUnMarkTaskController {
  constructor(private readonly taskUnmarker: TaskUnMarkerService) {}

  @Patch(':taskId/unmark')
  async invoke(@Param('taskId') taskId: string) {
    await this.taskUnmarker.unmark(taskId)

    return {
      message: 'Task unmarked successfully'
    }
  }
}