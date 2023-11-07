/* eslint-disable no-unused-vars */
import { $applyNodeReplacement } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createActionNode = () => $applyNodeReplacement(new ActionNode());

export class ActionNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const p = document.createElement('p');
    p.className = _config.theme.action;
    p.setAttribute('data-placeholder', 'Action...');

    return p;
  }
  updateDOM() {
    return false;
  }

  static clone(node) {
    return new ActionNode(node.__key);
  }
  static getType() {
    return 'action';
  }

  static importJSON(_) {
    return new ActionNode();
  }

  exportJSON() {
    return {
      type: 'action',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default ActionNode;
