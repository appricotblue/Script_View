/* eslint-disable no-unused-vars */
import { $applyNodeReplacement, $createParagraphNode } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createSubHeaderNode = () => $applyNodeReplacement(new SubHeaderNode());

export class SubHeaderNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const h5 = document.createElement('h5');
    h5.className = _config.theme.subheader;
    h5.setAttribute('data-placeholder', 'type subheader...');

    return h5;
  }
  updateDOM() {
    return false;
  }

  static clone(node) {
    return new SubHeaderNode(node.__key);
  }
  static getType() {
    return 'subheader';
  }

  static importJSON(_) {
    return new SubHeaderNode();
  }
  exportJSON() {
    return {
      type: 'subheader',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default SubHeaderNode;
