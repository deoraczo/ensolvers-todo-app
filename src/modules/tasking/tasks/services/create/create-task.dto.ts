import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string
}