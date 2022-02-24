import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsUUID() 
  folderId: string
}