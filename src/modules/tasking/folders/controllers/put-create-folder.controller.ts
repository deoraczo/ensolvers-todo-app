import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { CreateFolderDTO } from "../services/create/create-folder.dto";
import { FolderCreatorService } from "../services/create/folder-creator.service";

@Controller('folders')
export class PutCreateFolderController {

  constructor(private readonly folderCreator: FolderCreatorService) {}

  @Put(':folderId')
  @HttpCode(HttpStatus.CREATED)
  async invoke(@Param('folderId', new ParseUUIDPipe()) folderId: string, @Body() dto: CreateFolderDTO) {
    await this.folderCreator.create(folderId, dto)
    return {
      message: 'Folder created successfully',
      statusCode: HttpStatus.CREATED
    }
  }
}