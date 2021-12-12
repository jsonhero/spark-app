import { makeAutoObservable } from "mobx"
import _ from 'lodash'
import { GenericTagFragment } from '@operations'

import { SparkEditorStore } from './spark-editor'


// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

export interface SearchTagFilter {
  tag: GenericTagFragment
}
interface SearchFilters {
  tag: SearchTagFilter;
  search: { query: string };
}

type SearchFilterEntry = {
  type: keyof SearchFilters;
  data: SearchFilters[keyof SearchFilters];
}

export class GlobalStore  {
  searchFilters: SearchFilterEntry[] = []
  activeEditors: SparkEditorStore[] = []

  tagFilters = []
  
  constructor() {
    makeAutoObservable(this)
  }

  addSearchFilter<E extends keyof SearchFilters> (type: E, data: SearchFilters[E]): void {
    const filter: SearchFilterEntry = {
      type,
      data,
    }
    
    const matches = _.filter(this.searchFilters, _.matches(filter))
    if (matches.length === 0) {
      this.searchFilters.push(filter)
    }
  }

  removeSearchFilter(filter: SearchFilterEntry): void {
    console.log('remove', filter)
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


export const globalStore = new GlobalStore()
