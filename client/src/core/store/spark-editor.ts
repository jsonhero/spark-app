import { makeAutoObservable } from "mobx"
import { Editor } from '@tiptap/core'
import { uniqueId } from "lodash";

export class SparkEditorStore {
  id: string;
  editor: Editor | null = null;
  currentlyEditingSparkId: string | null | undefined = null
  isNew: boolean = true
  tags: string[] = []
  isActive: boolean = false;

  constructor(sparkId: string | null) {
    makeAutoObservable(this)
    this.id = uniqueId()
    this.currentlyEditingSparkId = sparkId
  }

  setEditor(editor: Editor) {
    this.editor = editor
  }

  setCurrentlyEditingSparkId(sparkId: string, isNew = false) {
    this.currentlyEditingSparkId = sparkId
    this.isNew = isNew
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSparkId = null
  }

  get isCurrentlyEditingSpark(): boolean {
    return this.currentlyEditingSparkId !== null
  }

  setTags(tags: string[]) {
    this.tags = tags;
  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
  }
}
