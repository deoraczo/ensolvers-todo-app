import { IsNotEmpty, IsString } from "class-validator";

export class RenameTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string
}