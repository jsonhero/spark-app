import React from 'react'
import { Box, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import Placeholder from '@tiptap/extension-placeholder'
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
import { findTags, extractTextFromJSONDoc } from '../../utils'


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

export const SparkEditor = ({ isNew, addSpark, updateSpark, existingSpark, ...rest }) => {

  console.log(toJS(existingSpark), 'spark')

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
    content: existingSpark ? existingSpark.doc : '',
    onBlur: ({ editor }) => {
      const tags = findTags(editor.state.doc).map((node) => node.attrs.id)
      if (isNew) {
        if (!editor.isEmpty) {
          addSpark(editor.getJSON(), tags)
        }
        editor.commands.clearContent()
      } else {
        updateSpark(existingSpark.id, editor.getJSON(), tags)
      }
    },
  }, [existingSpark]);

  return (
    <Box height="min-content" onClick={() => {
      editor.commands.focus()
    }} {...rest}>
      <EditorContent editor={editor} />
    </Box>
  );
}
