import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PutCreateFolderController } from './controllers/put-create-folder.controller';
import { Folder } from './folder.entity';
import { FolderRepository } from './folder.respository';
import { FolderCreatorService } from './services/create/folder-creator.service';
import { TypeOrmFolderRespository } from './typeorm-folder.repository';

@Module({
  controllers: [
    PutCreateFolderController
  ],
  providers: [
    {
      provide: FolderRepository,
      useClass: TypeOrmFolderRespository,
    },
    FolderCreatorService
  ],
  imports: [
    TypeOrmModule.forFeature([Folder], 'connection'),
  ],
})
export class FoldersModule {}
