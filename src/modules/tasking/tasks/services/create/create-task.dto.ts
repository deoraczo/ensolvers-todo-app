import { IsNotEmpty, IsString } from "class-validator";
import { IsTitleAlreadyExist } from "../../validators/is-title-already-exist.validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string
}