import { Controller, Get } from "@nestjs/common";
import { TaskCreatorService } from "../services/create/task-creator.service";

@Controller('test')
export class TestController {
  constructor (private readonly taskCreator: TaskCreatorService){}
  @Get()
  async __invoke() {
    await this.taskCreator.create({ id: '111', title: 'pete' })
  }
}