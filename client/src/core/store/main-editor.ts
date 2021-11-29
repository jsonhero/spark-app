import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import { Editor } from '@tiptap/core'
class MainEditor {
  editor: Editor | null = null;
  currentlyEditingSparkId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setEditor(editor: Editor) {
    this.editor = editor
  }

  setCurrentlyEditingSpark(sparkId: string) {
    this.currentlyEditingSparkId = sparkId
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSparkId = null
  }

  get isCurrentlyEditing(): boolean {
    return this.currentlyEditingSparkId !== null
  }
}


export const MainEditorContext = createContext(new MainEditor())
