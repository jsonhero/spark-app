import { EventEmitter } from "events"
import StrictEventEmitter from 'strict-event-emitter-types';
import { SuggestionKeyDownProps } from '@tiptap/suggestion'

// import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import { SparkEditorStore } from '@/core/store'
import { GenericSparkFragment } from '@operations'

interface AppEvent {}

export interface SparkEditorUpdateEvent extends AppEvent {
  editorStore: SparkEditorStore;
  transaction: Transaction;
}

export interface SparkEditorSwitchEvent extends AppEvent {
  spark: GenericSparkFragment
}

export interface TagSuggestionKeyDownEvent extends AppEvent {
  suggestion: SuggestionKeyDownProps
}

export type ListenerType<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];

export enum AppEventType {
  updateEditor = 'updateEditor',
  clearEditor = 'clearEditor',
  switchEditor = 'switchEditor',
  tagSuggestionKeyDown = 'tagSuggestionKeydown'
}

type AppEventTypeKeys = keyof typeof AppEventType;
type AppEventTypeKeyFields = {[key in AppEventTypeKeys]:AppEvent}

export interface AppEvents extends AppEventTypeKeyFields {
  updateEditor: (event: SparkEditorUpdateEvent) => void; 
  clearEditor: (event: AppEvent) => void
  switchEditor: (event: SparkEditorSwitchEvent) => void;
  tagSuggestionKeyDown: (event: TagSuggestionKeyDownEvent) => void;
}

export type AppEmitter = StrictEventEmitter<EventEmitter, AppEvents>

export function createAppEmitter(): AppEmitter {
  const appEmitter = new EventEmitter() as AppEmitter
  return appEmitter
}


export const appEmitter = createAppEmitter()