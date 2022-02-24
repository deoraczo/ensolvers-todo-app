import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteFolderController } from './controllers/delete-folder.controller';
import { GetAllFoldersController } from './controllers/get-all-folders.controller';
import { GetFolderController } from './controllers/get-folder.controller';
import { PathRenameFolderController } from './controllers/path-rename-folder.controller';
import { PutCreateFolderController } from './controllers/put-create-folder.controller';
import { Folder } from './folder.entity';
import { FolderRepository } from './folder.respository';
import { FolderCreatorService } from './services/create/folder-creator.service';
import { FolderDeleterService } from './services/delete/folder-deleter.service';
import { FolderFinderByMatchService } from './services/find/folder-finder-by-match.service';
import { FolderFinderService } from './services/find/folder-finder.service';
import { FolderSearcherService } from './services/search/folder-searcher.service';
import { FolderRanamerService } from './services/update/folder-ranames.service';
import { TypeOrmFolderRespository } from './typeorm-folder.repository';

@Module({
  controllers: [
    PutCreateFolderController,
    PathRenameFolderController,
    DeleteFolderController,
    GetAllFoldersController,
    GetFolderController,
  ],
  providers: [
    {
      provide: FolderRepository,
      useClass: TypeOrmFolderRespository,
    },
    FolderCreatorService,
    FolderFinderService,
    FolderRanamerService,
    FolderDeleterService,
    FolderSearcherService,
    FolderFinderByMatchService,
  ],
  imports: [
    TypeOrmModule.forFeature([Folder], 'connection'),
  ],
  exports: [
    FolderFinderService
  ]
})
export class FoldersModule {}
