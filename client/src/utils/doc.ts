import { Node } from 'prosemirror-model';
import { toJS } from 'mobx';

export const findTags = (doc: Node) => {
  const result: Node[] = [];
  doc.descendants((node, pos) => {
    if (node.type.name === 'tag') {
      result.push(node)
    }
  })
  return result
}


export const extractTextFromJSONDoc = (doc: any, charLimit = 200) => {
  let text = ''
  let stop = false
  function recurseNodes(node: any) {
    if (stop) return;
    if (node.type === 'text') {

      const words = node.text.split(' ')
      for (const word of words) {
        if (word.length + text.length <= charLimit) {
          text += ' ' + word
        } else {
          stop = true
          break;
        }
      }
    } else if (node.content && node.content.length) {
      node.content.forEach((n: any, i: number) => {
        if (node.type === 'doc' && i === 0) {
          return
        }
        recurseNodes(n)
      })
    }
    
  }
  recurseNodes(doc)

  return text
}

export const extractTitleFromJSONDoc = (doc: any) => {
  if (doc.type === 'doc' && doc.content && doc.content.length) {
    const firstNode = doc.content[0]
    if (firstNode.type === 'fixedtitle' && firstNode.content) {
      return firstNode.content[0].text
    }
  }
  return 'Untitled'
}