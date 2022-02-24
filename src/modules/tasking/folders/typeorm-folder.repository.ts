import { TypeOrmRepository } from "src/modules/shared/typeorm.repository";
import { EntityRepository, ObjectType } from "typeorm";
import { Folder } from "./folder.entity";
import { FolderRepository } from "./folder.respository";

@EntityRepository(Folder)
export class TypeOrmFolderRespository extends TypeOrmRepository<Folder> implements FolderRepository {

  protected entity(): ObjectType<Folder> {
      return Folder;
  }

  async save(folder: Folder): Promise<void> {
    await this.persist(folder)
  }

  async find(folderId: string): Promise<Folder> {
    return await this.findById(folderId)
  }

  async findAll(): Promise<Folder[]> {
    return await this.search()
  }

  async remove(id: string): Promise<void> {
    await this.delete(id)
  }

  async match(where: object = {}, relations: string[] = []): Promise<Folder> {
    return await this.findByMatch(where, relations)
  }
}