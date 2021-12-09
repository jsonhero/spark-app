import { makeAutoObservable } from "mobx"
import { Editor } from '@tiptap/core'
import {GenericSparkFragment } from '@operations'
import { uniqueId } from "lodash";

type PossibleSpark = GenericSparkFragment | null | undefined

export class SparkEditorStore {
  id: string;
  editor: Editor | null = null;
  currentlyEditingSpark: PossibleSpark = null
  isNew: boolean = true
  tags: string[] = []
  isActive: boolean = false;

  constructor(spark: PossibleSpark) {
    makeAutoObservable(this)
    this.id = uniqueId()
    this.currentlyEditingSpark = spark
  }

  setEditor(editor: Editor) {
    this.editor = editor
  }

  setCurrentlyEditingSpark(spark: PossibleSpark, isNew = false) {
    this.currentlyEditingSpark = spark
    this.isNew = isNew
  }

  clearCurrentlyEditingSpark() {
    this.currentlyEditingSpark = null
  }

  get isCurrentlyEditingSpark(): boolean {
    return this.currentlyEditingSpark !== null
  }

  setTags(tags: string[]) {
    this.tags = tags;
  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
  }
}
