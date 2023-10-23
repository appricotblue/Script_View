/* eslint-disable no-unused-vars */
import { $applyNodeReplacement } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createDialogueNode = () => new DialogueNode();

export class DialogueNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const p = document.createElement('p');
    p.className = _config.theme.dialogue;
    return p;
  }
  updateDOM() {
    return false;
  }

  static clone(node) {
    return new DialogueNode(node.__key);
  }
  static getType() {
    return 'dialogue';
  }

  static importJSON(_) {
    return new DialogueNode();
  }

  exportJSON() {
    return {
      type: 'dialogue',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default DialogueNode;
