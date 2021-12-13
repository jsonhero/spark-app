import React, { useEffect, useState } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder, { PlaceholderOptions } from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import _ from 'lodash'

import { Tag, FixedTitleNode } from './nodes'
import { tagSuggestions } from './utils'
import { SparkEditorStore, globalStore } from '@/core/store'
import { useEventEmitter, useSpark } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { observer } from 'mobx-react';


const CustomDocument = Document.extend({
  content: 'fixedtitle block*',
})
export interface SparkEditorProps extends BoxProps {
  onRegisterEditor?: (editor: SparkEditorStore) => void,
}

const SparkEditorComponent: React.FC<SparkEditorProps> = observer(({ onRegisterEditor, ...rest  }) => {

  const [sparkEditor] = useState(() => new SparkEditorStore(null))
  const { emit } = useEventEmitter()

  const spark = useSpark(sparkEditor?.currentlyEditingSpark?.id)


  useEffect(() => {
    globalStore.addActiveEditor(sparkEditor)
    
    return () => {
      globalStore.removeActiveEditor(sparkEditor.id)
    }
  }, [])

  const editor = useEditor({
    extensions: [
        CustomDocument,
        // Doing something fucky with empty tags
        // Heading.configure({
        //   HTMLAttributes: {},
        //   levels: [1, 2],
        // }),
        Paragraph,
        Text,
        Placeholder.configure({
          showOnlyWhenEditable: false,
          showOnlyCurrent: false,
          placeholder: ({ node }) => {
            if (node.type.name === 'fixedtitle') {
              return 'Untitled'
            }

            return ''
          },
        }),
        Tag.configure({
          HTMLAttributes: {
            class: 'hashtag',
          },
          suggestion: tagSuggestions
        }),
        FixedTitleNode
    ],
    content: sparkEditor.currentlyEditingSpark && sparkEditor.currentlyEditingSpark.doc ? sparkEditor.currentlyEditingSpark.doc : '',
    onUpdate({ transaction, editor }) {
      emit(AppEventType.updateEditor, {
        editorStore: sparkEditor,
        transaction: transaction
      })

    },
    onCreate({ editor }) {
      sparkEditor.setEditor(editor)
      if (onRegisterEditor) {
        onRegisterEditor(sparkEditor)
      }
      if (sparkEditor.isNew) {
        editor.commands.focus('end')
      }
    },
    onBlur() {
      sparkEditor.setActive(false)
    },
    onFocus() {
      sparkEditor.setActive(true)
    }
  }, [sparkEditor.currentlyEditingSpark?.id]);

  return (
    <Box height="min-content" onClick={() => {
      editor?.commands.focus()
    }} {...rest}>
      <EditorContent editor={editor} />
    </Box>
  );
})

export const SparkEditor = React.memo(SparkEditorComponent, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps)
})