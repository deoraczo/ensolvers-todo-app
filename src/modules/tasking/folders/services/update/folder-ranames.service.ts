import { Inject, Injectable } from "@nestjs/common";
import { FolderRepository } from "../../folder.respository";
import { FolderFinderService } from "../find/folder-finder.service";
import { RenameFolderDTO } from "./rename-folder.dto";

@Injectable()
export class FolderRanamerService {
  constructor(
    @Inject(FolderRepository)
    private readonly folderRepository: FolderRepository,
    private folderFinder: FolderFinderService
  ) {}

  async rename(id: string, dto: RenameFolderDTO): Promise<void> {
    const folderFound =  await this.folderFinder.find(id)
    const renamedFolder = folderFound.renameTitle(dto.title)
    await this.folderRepository.save(renamedFolder)
  }
}