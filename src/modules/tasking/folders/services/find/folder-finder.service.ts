import { Inject, Injectable } from "@nestjs/common";
import { FolderNotFoundException } from "../../exceptions/folder-not-founde.exception";
import { Folder } from "../../folder.entity";
import { FolderRepository } from "../../folder.respository";

@Injectable()
export class FolderFinderService {
  constructor(
    @Inject(FolderRepository)
    private readonly folderRepository: FolderRepository
  ) {}

  async find(folderId: string): Promise<Folder> {
    const folder = await this.folderRepository.find(folderId)
    if (!folder) {
      throw new FolderNotFoundException('Folder not found')
    }
    
    return folder
  }
}