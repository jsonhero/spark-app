import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance, Props } from 'tippy.js'
import { SuggestionOptions } from '@tiptap/suggestion'

import { TagList } from '../components'

export const tagSuggestions: Pick<SuggestionOptions, 'render'> = {
  render: () => { 
    let reactRenderer: ReactRenderer<HTMLDivElement>
    let popup: Instance<Props>[]

    return {
      onStart: (props) => {
        // @ts-ignore
        reactRenderer = new ReactRenderer(TagList, {
          props,
          editor: props.editor,
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        reactRenderer.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        // @ts-ignore
        return reactRenderer.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        reactRenderer.destroy()
      },
    }
  },


}