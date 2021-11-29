import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import { Editor } from '@tiptap/core'
import { Spark } from '@operations'

type PossibleSpark = Spark | null | undefined

export class SparkEditorStore {
  editor: Editor | null = null;
  currentlyEditingSpark: PossibleSpark = null

  constructor(spark: PossibleSpark) {
    makeAutoObservable(this)
    this.currentlyEditingSpark = spark
  }

  setEditor(editor: Editor) {
    this.editor = editor
  }

  setCurrentlyEditingSpark(spark: Spark) {
    this.currentlyEditingSpark = spark
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSpark = null
  }

  get isCurrentlyEditingSpark(): boolean {
    return this.currentlyEditingSpark !== null
  }
}


export const createSparkEditorContext = (spark: PossibleSpark)  => createContext(new SparkEditorStore(spark))
