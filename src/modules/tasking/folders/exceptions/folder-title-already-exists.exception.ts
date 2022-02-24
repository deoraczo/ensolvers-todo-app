import { ConflictException } from "@nestjs/common";

export class FolderTitleAlreadyExistsException extends ConflictException {}