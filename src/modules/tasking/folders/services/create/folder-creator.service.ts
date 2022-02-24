import { Inject, Injectable } from "@nestjs/common";
import { FolderIdAlreadyExistsException } from "../../exceptions/folder-id-already-exists.exception";
import { FolderTitleAlreadyExistsException } from "../../exceptions/folder-title-already-exists.exception";
import { Folder } from "../../folder.entity";
import { FolderRepository } from "../../folder.respository";
import { CreateFolderDTO } from "./create-folder.dto";

@Injectable()
export class FolderCreatorService {
  constructor(
    @Inject(FolderRepository)
    private readonly folderRepository: FolderRepository
  ){}

  async create(id: string, dto: CreateFolderDTO): Promise<void> {
    await this.ensureIdUuidDoesNotExists(id, this.folderRepository)
    await this.ensureTitleDoesNotExists(dto.title, this.folderRepository)
    
    const folder = Folder.create(id, dto.title)

    await this.folderRepository.save(folder)
  }
  
  private async ensureIdUuidDoesNotExists(folderId: string, folderRepository: FolderRepository): Promise<void> {
    const folderExists = await folderRepository.find(folderId)
    if (folderExists) {
      throw new FolderIdAlreadyExistsException('Folder id already exists')
    }
  }

  private async ensureTitleDoesNotExists(title: string, folderRepository: FolderRepository): Promise<void> {
    const folderExists = await folderRepository.match({ title }, [])
    if (folderExists) {
      throw new FolderTitleAlreadyExistsException(`Folder whit title=${title} already exists`)
    }
  }
}