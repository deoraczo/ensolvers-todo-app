import { Inject, Injectable } from "@nestjs/common";
import { FolderRepository } from "../../folder.respository";
import { FolderFinderService } from "../find/folder-finder.service";

@Injectable()
export class FolderDeleterService {
  constructor(
    @Inject(FolderRepository)
    private readonly folderRepository: FolderRepository,
    private readonly folderFinder: FolderFinderService
  ) { }

  async delete(id: string): Promise<void> {
    await this.folderFinder.find(id)
    await this.folderRepository.remove(id)
  }
}