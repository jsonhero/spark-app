// import { SuggestionKeyDownProps } from '@tiptap/suggestion'

import { tagSuggestionStore } from '../../../core/store'
import { appEmitter, AppEventType } from '@/core/events'


export const tagSuggestions = {
  render: () => {

    return {
      onStart(props) {

        tagSuggestionStore.setProps(props)
      },
      onUpdate(props) {
        tagSuggestionStore.setProps(props)
      },
      onExit() {
        console.log('exiting?')
        tagSuggestionStore.setProps(null)

        // tagPopoverStore.setProps(null)
        // tagPopoverStore.resetSelection()
      },
      onKeyDown(props) {

        appEmitter.emit(AppEventType.tagSuggestionKeyDown, { suggestion: props });
        if (props.event.key === 'Escape') {
          tagSuggestionStore.setProps(null)

          return true
        }

        if (props.event.key === 'ArrowUp') {
        //   tagPopoverStore.upHandler()
          return true
        }
  
        if (props.event.key === 'ArrowDown') {
        //   tagPopoverStore.downHandler()
          return true
        }

        if (props.event.key === ' ') {
        //   tagPopoverStore.addPossibleTag()
        //   return true
          return false
        }
  
        if (props.event.key === 'Enter') {
        //   tagPopoverStore.enterHandler()
          return true
        }

        // tagPopoverStore.resetSelection()
  
        return false
      },
    }


    // return {
    //   onStart: props => {
    //     component = new VueRenderer(MentionList, {
    //       // using vue 2:
    //       // parent: this,
    //       // propsData: props,
    //       props,
    //       editor: props.editor,
    //     })

    //     popup = tippy('body', {
    //       getReferenceClientRect: props.clientRect,
    //       appendTo: () => document.body,
    //       content: component.element,
    //       showOnCreate: true,
    //       interactive: true,
    //       trigger: 'manual',
    //       placement: 'bottom-start',
    //     })
    //   },

    //   onUpdate(props) {
    //     component.updateProps(props)

    //     popup[0].setProps({
    //       getReferenceClientRect: props.clientRect,
    //     })
    //   },

    //   onKeyDown(props) {
    //     if (props.event.key === 'Escape') {
    //       popup[0].hide()

    //       return true
    //     }

    //     return component.ref?.onKeyDown(props)
    //   },

    //   onExit() {
    //     popup[0].destroy()
    //     component.destroy()
    //   },
    // }
  },
}