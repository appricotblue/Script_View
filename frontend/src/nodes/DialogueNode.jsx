/* eslint-disable no-unused-vars */

import DefaultParagraphNode from './DefaultParagraphNode';
import { $createDialogueContainerNode } from './DialogueContainerNode';

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
  isParentRequired() {
    return true;
  }
  createParentElementNode() {
    return $createDialogueContainerNode;
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
