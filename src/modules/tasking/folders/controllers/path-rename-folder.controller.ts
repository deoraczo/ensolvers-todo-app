import { Body, Controller, Param, Patch } from "@nestjs/common";
import { FolderRanamerService } from "../services/update/folder-ranames.service";
import { RenameFolderDTO } from "../services/update/rename-folder.dto";

@Controller('folders')
export class PathRenameFolderController {
  constructor(private readonly folderRenamer: FolderRanamerService) {}

  @Patch(':folderId')
  async invoke(@Param('folderId') folderId: string, @Body() dto: RenameFolderDTO) {
    await this.folderRenamer.rename(folderId, dto)

    return {
      message: 'Folder title renamed successfully'
    }
  }
}