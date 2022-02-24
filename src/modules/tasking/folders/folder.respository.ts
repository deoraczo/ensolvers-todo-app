import { Nullable } from "src/modules/shared/nullable";
import { Folder } from "./folder.entity";


export interface FolderRepository {
  save(folder: Folder): Promise<void>
  find(folderId: string): Promise<Nullable<Folder>>
  findAll(): Promise<Folder[]>
  remove(id: string): Promise<void>
  match(where: Object, relations: string[]): Promise<Nullable<Folder>>
}

export const FolderRepository = Symbol('FolderRepository')