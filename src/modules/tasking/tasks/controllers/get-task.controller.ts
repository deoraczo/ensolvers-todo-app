import { Controller, Get, Param } from "@nestjs/common";
import { TaskFinderService } from "../services/find/task-finder.service";

@Controller('tasks')
export class GetTaskController {
  constructor(private readonly taskFinder: TaskFinderService) {}
  
  @Get(':taskId')
  async invoke(@Param('taskId') taskId: string) {
    const response = await this.taskFinder.find(taskId)
    return response
  }
}