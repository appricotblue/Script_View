/* eslint-disable no-unused-vars */
import { $applyNodeReplacement } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createSluglineNode = () => $applyNodeReplacement(new SluglineNode());

export class SluglineNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const h6 = document.createElement('h6');
    h6.className = _config.theme.slugline;
    h6.setAttribute('data-placeholder', 'Slugline...');

    return h6;
  }
  updateDOM() {
    return false;
  }
  static clone(node) {
    return new SluglineNode(node.__key);
  }
  static getType() {
    return 'slugline';
  }

  static importJSON(_) {
    return new SluglineNode();
  }

  exportJSON() {
    return {
      type: 'slugline',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default SluglineNode;
