import { makeAutoObservable } from "mobx"
import _ from 'lodash'

export class FolderTreeStore  {
  
  constructor() {
    makeAutoObservable(this)
  }

}


export const folderTreeStore = new FolderTreeStore()
