import React, { useEffect, useContext, useState } from 'react'
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

import { Tag, FixedTitleNode } from './nodes'
import { tagSuggestions } from './utils'
import { findTags, extractTextFromJSONDoc } from '@/utils'
import { Spark } from '@operations'
import { SparkEditorStore, globalStore } from '@/core/store'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { observer } from 'mobx-react';


const CustomDocument = Document.extend({
  content: 'fixedtitle block*',
})

const EscapeBlurExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      'Escape': () => this.editor.commands.blur()
    }
  }
})

export interface SparkEditorProps extends BoxProps {
  onRegisterEditor?: (editor: SparkEditorStore) => void,
}

const SparkEditorComponent: React.FC<SparkEditorProps> = observer(({ onRegisterEditor, ...rest  }) => {

  const [sparkEditor] = useState(() => new SparkEditorStore(null))
  const { emit } = useEventEmitter()

  useEffect(() => {
    globalStore.addActiveEditor(sparkEditor)
    
    return () => {
      globalStore.removeActiveEditor(sparkEditor.id)
    }
  }, [])

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
        EscapeBlurExtension,
        FixedTitleNode
    ],
    content: sparkEditor.currentlyEditingSpark && sparkEditor.currentlyEditingSpark.doc ? sparkEditor.currentlyEditingSpark.doc : '',
    onUpdate({ transaction, editor }) {
      emit(AppEventType.updateEditor, {
        editorStore: sparkEditor,
        transaction: transaction
      })

      // const tagNodes = findTags(transaction.doc)
      // const tags = tagNodes.map((node) => node.attrs.id)
      // sparkEditor.setTags(_.uniq(tags))
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