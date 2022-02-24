import { Inject, Injectable } from "@nestjs/common";
import { Not } from "typeorm";
import { FolderTitleAlreadyExistsException } from "../../exceptions/folder-title-already-exists.exception";
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
    await this.ensureTitleDoesNotExists(id, dto.title, this.folderRepository)
    const renamedFolder = folderFound.renameTitle(dto.title)
    await this.folderRepository.save(renamedFolder)
  }

  private async ensureTitleDoesNotExists(id: string, title: string, folderRepository: FolderRepository): Promise<void> {
    const folderExists = await folderRepository.match({ title, id: Not(id) }, [])
    if (folderExists) {
      throw new FolderTitleAlreadyExistsException(`Folder whit title=${title} already exists`)
    }
  }
}