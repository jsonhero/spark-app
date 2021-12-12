import { Node, Range } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export type TagOptions = {
  HTMLAttributes: Record<string, any>,
}


export const FixedTitleNode = Node.create<TagOptions>({
  name: 'fixedtitle',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'h1',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'h1',
      0
    ]
  },
  

  // addKeyboardShortcuts() {
  //   return {
  //     'Enter': () => {
  //      return this.editor.commands.command(({ tr, view, dispatch }) => {
  //        const { $from } = tr.selection

  //        const nodeParent = $from.parent

  //        if (nodeParent.type.name === 'fixedtitle' && dispatch) { 
  //          this.editor
  //           // .can()
  //           .chain()
  //           .insertContent([
  //             {
  //               type: 'paragraph'
  //             },
  //             {
  //               type: 'text',
  //               text: 'Some random paragraph'
  //             }
  //           ])

  //           this.editor.commands.focus('end')
  //          return true;
  //        }



  //        return false;
  //      })
  //     }
  //   }
  // },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('fixedtitle'),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === 'Enter') {
              const { selection } = this.editor.state
              const { $from } = selection
              const nodeParent = $from.parent;

              if (nodeParent.type.name === 'fixedtitle') { 
              

              

                const endPos = nodeParent.nodeSize
                const deleteRng: Range = {
                  from: $from.pos,
                  to: endPos,
                }
                
                const textForParagraph = this.editor.state.doc.textBetween(deleteRng.from, deleteRng.to)
                const paragraphContent = []

                if (textForParagraph.length) {
                  paragraphContent.push({
                    type: 'text',
                    text: textForParagraph
                  })
                }
              
                this.editor
                  // .can()
                  .chain()
                  .deleteRange(deleteRng)
                  .insertContent([
                    {
                      type: 'paragraph',
                      content: paragraphContent,
                    },
                  ])
                  .focus((endPos + 1) - textForParagraph.length)
                  .run()
                  

                  // this.editor.commands.focus('end')
                return true;
              }
            }
            return false;
          }
        }
      }),
    ]
  },

})