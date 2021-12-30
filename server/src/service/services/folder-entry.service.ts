import { Injectable } from '@nestjs/common';
import { Repository, In, FindManyOptions } from 'typeorm';

import { DbConnection } from '../../db';
import { FolderEntry, Folder } from '../../entity';

@Injectable()
export class FolderEntryService {
  constructor(private connection: DbConnection) {}

  private get repository(): Repository<FolderEntry> {
    return this.connection.getRepository(FolderEntry);
  }

  public async getRootFolderEntries(): Promise<FolderEntry[]> {
    return this.repository.find({
      relations: ['folder'],
      where: {
        folder: {
          isRoot: true
        }
      }
    })
  }

  public async getRootFolder(): Promise<Folder> {
    return this.connection.getRepository(Folder).findOne({
      isRoot: true,
    })
  }

  public async getFolderEntries(folderId: string): Promise<FolderEntry[]> {
    return this.repository.find({
      relations: ['folder'],
      where: {
        folder: {
          id: folderId,
        }
      },
      order: {
        updatedAt: 'ASC'
      }
    })
  }

  public async getFolderById(id: string): Promise<Folder> {
    return this.connection.getRepository(Folder).findOne(id)
  }

  public async createFolderInParent(name: string, parentFolderId: string): Promise<FolderEntry> {
    const newFolder = this.connection.getRepository(Folder).create({
      name,
    })


    const createdFolder = await this.connection.getRepository(Folder).save(newFolder)

    return this.addFolderEntry(createdFolder.id, 'folder', parentFolderId)
  }

  public async addFolderEntry(entityId: string, entityType: string, folderId: string): Promise<FolderEntry> {
    const newFolderEntry = this.repository.create({
      entityId,
      entityType,
      folder: {
        id: folderId,
      }
    });

    return this.repository.save(newFolderEntry);
  }

  public async removeFolderEntry(folderEntryId: string) {
    this.repository.delete({
      id: folderEntryId,
    })
  }

}