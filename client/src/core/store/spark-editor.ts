import { makeAutoObservable } from "mobx"
import { Editor } from '@tiptap/core'
import { Spark } from '@operations'

type PossibleSpark = Spark | null | undefined

export class SparkEditorStore {
  editor: Editor | null = null;
  currentlyEditingSpark: PossibleSpark = null
  isNew: boolean = true

  constructor(spark: PossibleSpark) {
    makeAutoObservable(this)
    this.currentlyEditingSpark = spark
  }

  setEditor(editor: Editor) {
    this.editor = editor
  }

  setCurrentlyEditingSpark(spark: Spark, isNew = false) {
    this.currentlyEditingSpark = spark
    this.isNew = isNew
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSpark = null
  }

  get isCurrentlyEditingSpark(): boolean {
    return this.currentlyEditingSpark !== null
  }
}
