import { Controller, Get, Param } from "@nestjs/common";
import { FolderFinderByMatchService } from "../services/find/folder-finder-by-match.service";

@Controller('folders')
export class GetFolderController {
  constructor(private readonly folderFinder: FolderFinderByMatchService) {}
  
  @Get(':folderId/tasks')
  async invoke(@Param('folderId') folderId: string) {
    const response = await this.folderFinder.find({
      id: folderId
    }, ['tasks'])
    return response
  }
}