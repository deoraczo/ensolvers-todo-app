import { Inject, Injectable } from "@nestjs/common";
import { FolderNotFoundException } from "../../exceptions/folder-not-founde.exception";
import { Folder } from "../../folder.entity";
import { FolderRepository } from "../../folder.respository";

@Injectable()
export class FolderFinderByMatchService {
  constructor(
    @Inject(FolderRepository)
    private readonly folderRepository: FolderRepository
  ) {}

  async find(where: object = {}, relations: string[] = []): Promise<Folder> {
    const folder = await this.folderRepository.match(where, relations)
    if (!folder) {
      throw new FolderNotFoundException('Folder not found')
    }
    
    return folder
  }
}