import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { CreateTaskDTO } from "../services/create/create-task.dto";
import { TaskCreatorService } from "../services/create/task-creator.service";

@Controller('tasks')
export class PutTaskController {
  constructor(private readonly taskCreator: TaskCreatorService) {}

  @Put(':taskId')
  @HttpCode(HttpStatus.CREATED)
  async invoke(@Body() dto: CreateTaskDTO, @Param('taskId', new ParseUUIDPipe()) taskId: string) {
    await this.taskCreator.create(taskId, dto)
    return {
      message: 'Task created successfully',
      statusCode: HttpStatus.CREATED
    }
  }
}