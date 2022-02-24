import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathRenameFolderController } from './controllers/path-rename-folder.controller';
import { PutCreateFolderController } from './controllers/put-create-folder.controller';
import { Folder } from './folder.entity';
import { FolderRepository } from './folder.respository';
import { FolderCreatorService } from './services/create/folder-creator.service';
import { FolderFinderService } from './services/find/folder-finder.service';
import { FolderRanamerService } from './services/update/folder-ranames.service';
import { TypeOrmFolderRespository } from './typeorm-folder.repository';

@Module({
  controllers: [
    PutCreateFolderController,
    PathRenameFolderController,
  ],
  providers: [
    {
      provide: FolderRepository,
      useClass: TypeOrmFolderRespository,
    },
    FolderCreatorService,
    FolderFinderService,
    FolderRanamerService,
  ],
  imports: [
    TypeOrmModule.forFeature([Folder], 'connection'),
  ],
})
export class FoldersModule {}
