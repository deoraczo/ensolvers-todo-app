import { Controller, Get } from "@nestjs/common";
import { TaskSearcherService } from "../services/search/task-searcher.service";
import { Task } from "../task.entity";

@Controller('tasks')
export class GetAllTasksController {
  constructor (private readonly taskSearcher: TaskSearcherService) {}

  @Get()
  async invoke() {
    return await this.taskSearcher.search()
  }
}