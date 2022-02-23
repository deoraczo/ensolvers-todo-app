import { Controller, Param, Patch } from "@nestjs/common";
import { TaskMarkerService } from "../services/update/task-marker.service";

@Controller('tasks')
export class PathMarkTaskController {
  constructor(private readonly taskMarker: TaskMarkerService) {}

  @Patch(':taskId/mark')
  async invoke(@Param('taskId') taskId: string) {
    await this.taskMarker.mark(taskId)
    
    return {
      message: 'Task marked successfully'
    }
  }
}