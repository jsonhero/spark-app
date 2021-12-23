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

  public async getFolderEntries(folderId: string): Promise<FolderEntry[]> {
    return this.repository.find({
      relations: ['folder'],
      where: {
        folder: {
          id: folderId,
        }
      }
    })
  }

  public async getFolderById(id: string): Promise<Folder> {
    return this.connection.getRepository(Folder).findOne(id)
  }


}
