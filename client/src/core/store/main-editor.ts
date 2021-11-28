import { makeAutoObservable } from "mobx"
import { createContext } from "react"

class MainEditor {
  currentlyEditingSparkId: string | null = null

  constructor() {
    makeAutoObservable(this)
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
