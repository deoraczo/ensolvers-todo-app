import { Inject, Injectable } from "@nestjs/common";
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
    const folder = Folder.create(id, dto.title)

    await this.folderRepository.save(folder)
  }
  
}