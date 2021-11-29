import React, { useEffect, useContext } from 'react'
import { Box, Flex, Button, SimpleGrid, BoxProps } from '@chakra-ui/react'
import { useEditor, EditorContent, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import Placeholder, { PlaceholderOptions } from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import { Node } from 'prosemirror-model';
import Text from '@tiptap/extension-text'
import { Extension } from '@tiptap/core'
import { toJS } from 'mobx';
import _, { isEmpty } from 'lodash'

import { Tag } from './nodes'
import { tagSuggestions } from './utils'
import { findTags, extractTextFromJSONDoc } from '@/utils'
import { Spark } from '@operations'
import { createSparkEditorContext, SparkEditorStore } from '@/core/store'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'


const CustomDocument = Document.extend({
  content: 'heading block*',
})

const EscapeBlurExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      'Escape': () => this.editor.commands.blur()
    }
  }
})

export interface SparkEditorProps extends BoxProps {
  spark?: Spark | null 
  onRegisterEditor?: (editor: SparkEditorStore) => void
}

const SparkEditorComponent: React.FC<SparkEditorProps> = ({ spark = null, onRegisterEditor, ...rest  }) => {

  const sparkEditor = useContext(createSparkEditorContext(spark))
  const { emit } = useEventEmitter()


  const editor = useEditor({
    extensions: [
        CustomDocument,
        Heading.configure({
          HTMLAttributes: {},
          levels: [1, 2],
        }),
        Paragraph,
        Text,
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
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
        EscapeBlurExtension
    ],
    content: '',
    onUpdate({ transaction }) {
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
    }
  });

  return (
    <Box height="min-content" onClick={() => {
      editor?.commands.focus()
    }} {...rest}>
      <EditorContent editor={editor} />
    </Box>
  );
}

export const SparkEditor = React.memo(SparkEditorComponent, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps)
})