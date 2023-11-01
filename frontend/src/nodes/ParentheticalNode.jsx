/* eslint-disable no-unused-vars */

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createParentheticalNode = () => new ParentheticalNode();

export class ParentheticalNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const div = document.createElement('div');
    div.className = _config.theme.parenthetical;
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

  static importJSON(_) {
    return new ParentheticalNode();
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

export default ParentheticalNode;
