import { ElementNode } from 'lexical';

import { $createDialogueNode, $isDialogueNode } from './DialogueNode';
import { $createMentionNode } from './MentionNode';
export const $createParentheticalNode = () => new ParentheticalNode();
export const $isParentheticalNode = (node) => node instanceof ParentheticalNode;

export class ParentheticalNode extends ElementNode {
  constructor() {
    super();
  }

  createDOM(config) {
    const div = document.createElement('div');
    div.className = config.theme.parenthetical;
      div.setAttribute('data-placeholder', 'Parenthetical...');
    return div;
  }

  updateDOM() {
    return false;
  }

  static clone(node) {
    return new ParentheticalNode(node.__key);
  }
  static getType() {
    return 'parenthetical';
  }
  static importJSON() {
    return new ParentheticalNode();
  }

  isParentRequired() {
    return true;
  }

  /** inserts dialogueNode if doesn't exist. select next if does. */
  insertNewAfter(_, restoreSelection) {
    if (!$isDialogueNode(this.getNextSibling())) {
      const dialogue = $createDialogueNode();
      this.insertAfter(dialogue, restoreSelection);
      return dialogue;
    }

    return this.selectNext();
  }

  remove(preserveEmptyParent) {
    if (this.getNextSibling()) this.selectNext();
    return super.remove(preserveEmptyParent);
  }

  collapseAtStart() {
    return this.remove();
  }

  exportJSON() {
    return {
      type: 'parenthetical',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default ParanthticalMain;