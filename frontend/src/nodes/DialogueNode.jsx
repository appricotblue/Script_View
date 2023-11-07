/* eslint-disable no-unused-vars */

import { $createParagraphNode, $setSelection } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createDialogueNode = () => new DialogueNode();

export class DialogueNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const div = document.createElement('div');
    div.className = _config.theme.dialogue;
    div.setAttribute('data-placeholder', 'Dialogue...');
    return div;
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

  insertNewAfter() {
    const parent = this.getParent();
    if (!parent) {
      // The DialogueContainerNode does not have a parent node, so we cannot insert a new node after it.
      return;
    }
    // Insert a new node after the DialogueContainerNode.
    const newNode = $createParagraphNode();
    const newlyInserted = parent.insertNewAfter(newNode);

    // Set the selection to the new node.
    $setSelection(newNode);
    return newlyInserted;
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
