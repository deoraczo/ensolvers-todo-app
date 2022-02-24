import { Controller, Get } from "@nestjs/common";
import { FolderSearcherService } from "../services/search/folder-searcher.service";

@Controller('folders')
export class GetAllFoldersController {
  constructor (private readonly folderSearcher: FolderSearcherService) {}

  @Get()
  async invoke() {
    return await this.folderSearcher.search()
  }
}