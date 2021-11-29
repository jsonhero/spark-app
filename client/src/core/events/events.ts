import { EventEmitter } from "events"
import StrictEventEmitter from 'strict-event-emitter-types';

// import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import { SparkEditorStore } from '@/core/store'

interface AppEvent {}

export interface SparkEditorUpdateEvent extends AppEvent {
  editorStore: SparkEditorStore;
  transaction: Transaction;
}

export type ListenerType<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];

export enum AppEventType {
  updateEditor = 'updateEditor',
  clearEditor = 'clearEditor'
}

type AppEventTypeKeys = keyof typeof AppEventType;
type AppEventTypeKeyFields = {[key in AppEventTypeKeys]:AppEvent}

export interface AppEvents extends AppEventTypeKeyFields {
  updateEditor: (event: SparkEditorUpdateEvent) => void; 
  clearEditor: (event: AppEvent) => void
}

export type AppEmitter = StrictEventEmitter<EventEmitter, AppEvents>

export function createAppEmitter(): AppEmitter {
  const appEmitter = new EventEmitter() as AppEmitter
  return appEmitter
}


