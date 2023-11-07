/* eslint-disable no-unused-vars */
import { $applyNodeReplacement } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createTransitionNode = () => $applyNodeReplacement(new TransitionNode());

export class TransitionNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const p = document.createElement('p');
    p.className = _config.theme.transition;
    p.setAttribute('data-placeholder', 'Transition...');
    p.innerHTML = '- cut to -';
    return p;
  }
  updateDOM() {
    return false;
  }

  static clone(node) {
    return new TransitionNode(node.__key);
  }
  static getType() {
    return 'transition';
  }

  static importJSON(_) {
    return new TransitionNode();
  }

  exportJSON() {
    return {
      type: 'transition',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default TransitionNode;
