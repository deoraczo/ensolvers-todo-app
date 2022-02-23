import { ConflictException } from "@nestjs/common";

export class TaskEmailAlreadyExistsException extends ConflictException {}