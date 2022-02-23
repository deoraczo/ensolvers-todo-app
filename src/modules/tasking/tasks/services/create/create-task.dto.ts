import { IsNotEmpty, IsString } from "class-validator";
import { IsTitleAlreadyExist } from "../../validators/is-title-already-exist.validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @IsTitleAlreadyExist({
    message: 'Task whit title $value already exists'
  })
  title: string
}