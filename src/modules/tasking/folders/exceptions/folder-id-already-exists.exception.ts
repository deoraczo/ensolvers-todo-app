import { ConflictException } from "@nestjs/common";

export class FolderIdAlreadyExistsException extends ConflictException {}