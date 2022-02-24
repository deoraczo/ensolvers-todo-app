import { Controller, Delete, Param } from "@nestjs/common";
import { FolderDeleterService } from "../services/delete/folder-deleter.service";

@Controller('folders')
export class DeleteFolderController {
  
  constructor(private readonly folderDeleter: FolderDeleterService) {}

  @Delete(':folderId')
  async invoke(@Param('folderId') folderId: string) {
    await this.folderDeleter.delete(folderId)

    return {
      message: 'Folder deleted successfully'
    }
  }
}