import { ConflictException } from "@nestjs/common";

export class TaskTitleAlreadyExistsException extends ConflictException {}