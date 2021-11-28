import { tagPopoverStore } from '../../../core/store'

export const tagSuggestions = {
  render: () => {
    return {
      onStart(props) {

        tagPopoverStore.setProps(props)
      },
      onUpdate(props) {
        tagPopoverStore.setProps(props)
      },
      onExit() {
        tagPopoverStore.setProps(null)
        tagPopoverStore.resetSelection()
      },
      onKeyDown(props) {

        if (props.event.key === 'Escape') {
          tagPopoverStore.setProps(null)

          return true
        }

        if (props.event.key === 'ArrowUp') {
          tagPopoverStore.upHandler()
          return true
        }
  
        if (props.event.key === 'ArrowDown') {
          tagPopoverStore.downHandler()
          return true
        }

        if (props.event.key === ' ') {
          tagPopoverStore.addPossibleTag()
          return true
        }
  
        if (props.event.key === 'Enter') {
          tagPopoverStore.enterHandler()
          return true
        }

        tagPopoverStore.resetSelection()
  
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