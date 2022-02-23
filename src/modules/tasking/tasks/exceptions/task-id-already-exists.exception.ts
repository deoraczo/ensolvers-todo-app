import { ConflictException } from "@nestjs/common";

export class TaskIdAlreadyExistsException extends ConflictException {}