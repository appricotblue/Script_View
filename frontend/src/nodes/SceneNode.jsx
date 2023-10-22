/* eslint-disable no-unused-vars */
import { $createParagraphNode, ElementNode } from 'lexical';

export const $createSceneNode = () => new SceneNode();

export class SceneNode extends ElementNode {
  createDOM(_config, _editor) {
    const h2 = document.createElement('h2');
    h2.className = _config.theme.scene;
    return h2;
  }
  static clone(node) {
    return new SceneNode(node.__key);
  }
  static getType() {
    return 'scene';
  }

  updateDOM(_prevNode, _dom, _config) {
    return false;
  }

  static importJSON(_) {
    return new SceneNode();
  }
  // Node should be set to paragraph when user delete all content

  collapseAtStart(_) {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
  /**
   * Node should be set to paragraph when user press Enter.
   * Node will remain the same on Shift + Enter
   */
  insertNewAfter(_, restoreSelection) {
    const paragraph = $createParagraphNode();
    const direction = this.getDirection();
    paragraph.setDirection(direction);
    this.insertAfter(paragraph, restoreSelection);
    return paragraph;
  }

  exportJSON() {
    return {
      type: 'scene',
      version: 1,
      children: [],
      customValue: 'scene node',
      format: '',
      indent: 1,
      direction: null,
    };
  }
}

export default SceneNode;
