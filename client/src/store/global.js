import { makeAutoObservable } from "mobx"
import _ from 'lodash'

class Global {
  searchFilters = []
  currentlyEditingSparkId = null

  constructor() {
    makeAutoObservable(this)

  }

  addSearchFilter(filter) {
    const matches = _.filter(this.searchFilters, _.matches(filter))
    if (matches.length === 0) {
      this.searchFilters.push(filter)
    }
  }

  removeSearchFilter(filter) {
    const matches = _.remove(this.searchFilters, (o) => !_.isMatch(o, filter))
    this.searchFilters = matches
  }

  clearSearchFilters() {
    this.searchFilters = []
  }

  setCurrentlyEditingSpark(sparkId) {
    this.currentlyEditingSparkId = sparkId
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSparkId = null
  }
}


export const globalStore = new Global()
