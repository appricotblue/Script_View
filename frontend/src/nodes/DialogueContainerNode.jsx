/* eslint-disable no-unused-vars */
import DefaultParagraphNode from './DefaultParagraphNode';
import DialogueNode from './DialogueNode';
import ParentheticalNode from './ParentheticalNode';

export const $createDialogueContainerNode = () => new DialogueContainerNode();
export class DialogueContainerNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const div = document.createElement('div');
    div.className = _config.theme.dialogueContainer;
    return div;
  }
  updateDOM() {
    const childrenSize = this.getChildrenSize();
    if (childrenSize === 0 || !this.getParent()) return this.remove(true);
    if (childrenSize === 1) {
      const childType = this.getLastChild()?.__type;
      const dialogueOrParenthetical =
        childType === ParentheticalNode.getType() || childType === DialogueNode.getType();
      if (!dialogueOrParenthetical) {
        return this.remove(true);
      }
    }
    return false;
  }

  static clone(node) {
    return new DialogueContainerNode(node.__key);
  }
  static getType() {
    return 'dialogue-container';
  }

  static importJSON(_) {
    return new DialogueContainerNode();
  }

  exportJSON() {
    return {
      type: 'dialogue-container',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default DialogueContainerNode;
