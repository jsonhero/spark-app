import { makeAutoObservable } from "mobx"
import { makePersistable } from 'mobx-persist-store';

class TagPopover {
  props = null
  selectedIndex = 0
  tags = []
  possibleTags = []

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, { name: 'TagPopover', properties: ['possibleTags'], storage: window.localStorage });

  }

  setProps(props) {
    this.props = props
    this.selectedIndex = -1 

    if (this.props) {
      const foundTagIndex = this.possibleTags.findIndex((tag) => this.props.query === tag) 
      if (foundTagIndex !== -1) {
        this.selectedIndex = foundTagIndex
      }
    }
    
  }

  upHandler() {
    this.selectedIndex = ((this.selectedIndex + this.possibleTags.length) - 1) % this.possibleTags.length
  }

  downHandler() {
    this.selectedIndex = (this.selectedIndex + 1) % this.possibleTags.length
  }

  enterHandler() {
    if (this.selectedIndex !== -1) {
      this.selectItem(this.selectedIndex)
    } else {
      this.addPossibleTag()
    }
  }

  resetSelection() {
    this.selectedIndex = -1
  }

  selectItem(index) {
    const item = this.possibleTags[index]

    if (item) {
      this.props.command({ id: item })
    }
  
  }

  setTags(tags) {
    this.tags = tags
  }

  addPossibleTag() {
    const query = this.props.query
    if (query.length > 0) {
      this.props.command({ id: query })
      this.possibleTags.push(query)
    }
  }

}


export const tagPopoverStore = new TagPopover()
