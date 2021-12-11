
import { makeAutoObservable } from "mobx"
import { SuggestionProps } from '@tiptap/suggestion'

export class TagSuggestionStore {
  props: SuggestionProps | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setProps(props: SuggestionProps | null) {
    this.props = props;
  }
}


export const tagSuggestionStore = new TagSuggestionStore()