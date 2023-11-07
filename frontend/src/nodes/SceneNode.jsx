/* eslint-disable no-unused-vars */
import { $applyNodeReplacement } from 'lexical';

import DefaultParagraphNode from './DefaultParagraphNode';

export const $createSceneNode = () => $applyNodeReplacement(new SceneNode());

export class SceneNode extends DefaultParagraphNode {
  constructor() {
    super();
  }

  createDOM(_config, _editor) {
    const h4 = document.createElement('h4');
    h4.className = _config.theme.scene;
    h4.setAttribute('data-placeholder', 'type scene...');

    return h4;
  }
  updateDOM() {
    return false;
  }

  static clone(node) {
    return new SceneNode(node.__key);
  }
  static getType() {
    return 'scene';
  }

  static importJSON(_) {
    return new SceneNode();
  }

  exportJSON() {
    return {
      type: 'scene',
      version: 1,
      children: [],
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default SceneNode;
