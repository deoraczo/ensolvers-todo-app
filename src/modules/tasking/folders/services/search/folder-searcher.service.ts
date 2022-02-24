import { Inject } from "@nestjs/common";
import { Folder } from "../../folder.entity";
import { FolderRepository } from "../../folder.respository";

export class FolderSearcherService {
  constructor(
    @Inject(FolderRepository) private readonly folderRepository: FolderRepository
  ) {}

  async search(): Promise<Folder[]> {
    return await this.folderRepository.findAll()
  }
}