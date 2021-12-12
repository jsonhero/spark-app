import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const TitleExtension = Extension.create({
  name: 'title',

  addKeyboardShortcuts() {
    return {
      'Enter': () => {
       return this.editor.commands.command(({ tr, view }) => {
         console.log('entering', tr.selection)
         const { $from, $to } = tr.selection
         console.log(view.state.doc.resolve(tr.selection.$from.pos).parent,  'nodey')

        //  console.log(tr.selection.$from., 'parental')

         return true;
       })
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('title'),

      }),
    ]
  },
})