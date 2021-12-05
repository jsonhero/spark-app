import { makeAutoObservable } from "mobx"
import _ from 'lodash'
import { SparkEditorStore } from './spark-editor'

class Global {
  searchFilters: any[] = []
  activeEditors: SparkEditorStore[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addSearchFilter(filter: any) {
    const matches = _.filter(this.searchFilters, _.matches(filter))
    if (matches.length === 0) {
      this.searchFilters.push(filter)
    }
  }

  removeSearchFilter(filter: any) {
    const matches = _.remove(this.searchFilters, (o) => !_.isMatch(o, filter))
    this.searchFilters = matches
  }

  clearSearchFilters() {
    this.searchFilters = []
  }


  addActiveEditor(editor: SparkEditorStore) {
    this.activeEditors.push(editor)
  }

  removeActiveEditor(editorId: string) {
    this.activeEditors = this.activeEditors.filter((editor) => editor.id !== editorId)
  }


}


export const globalStore = new Global()
