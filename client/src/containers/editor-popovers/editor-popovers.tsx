import React from 'react'

import { TagPopover } from "@/components";
import { tagSuggestionStore } from '@/core/store'

export const EditorPopovers = () => {
  return (
    <>
      <TagPopover tagSuggestionStore={tagSuggestionStore} />
    </>
  )
}