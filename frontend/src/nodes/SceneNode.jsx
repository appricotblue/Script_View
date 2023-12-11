import { $applyNodeReplacement } from 'lexical';

import DefaultActionNode from './DefaultActionNode';

export const $createSceneNode = () => $applyNodeReplacement(new SceneNode());
export const $isSceneNode = (node) => node instanceof SceneNode;

export class SceneNode extends DefaultActionNode {
  constructor() {
    super();
  }

  createDOM(config) {
    const h4 = document.createElement('h4');
    h4.className = config.theme.scene;
    const text = document.createTextNode('Scene/സീൻ:');
    h4.appendChild(text);
    h4.setAttribute('data-placeholder', 'Scene...');
    

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

  static importJSON() {
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
