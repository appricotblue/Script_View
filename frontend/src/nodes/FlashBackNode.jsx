import { $applyNodeReplacement } from 'lexical';

import DefaultActionNode from './DefaultActionNode';
import DefaultParagraphNode from './DefaultParagraphNode';

export const $createFlashbackNode = () =>
    $applyNodeReplacement(new FlashbackNode());

export const $isFlashbackNode = (node) => node instanceof FlashbackNode;

export class FlashbackNode extends DefaultParagraphNode {
    constructor() {
        super();
    }

    createDOM(config) {
        const p = document.createElement('p');
        // p.className = config.theme.flashback;
        p.setAttribute('data-placeholder', 'Flashback...');
        p.style.fontSize = '18px';
        p.style.fontWeight = 'bold';
        p.append(document.createTextNode('- flashback to -'));
        return p;
    }

    updateDOM() {
        return false;
    }

    static clone(node) {
        return new FlashbackNode(node.__key);
    }

    static getType() {
        return 'flashback';
    }

    static importJSON() {
        return new FlashbackNode();
    }

    exportJSON() {
        return {
            type: 'flashback',
            version: 1,
            children: [],
            format: '',
            indent: 1,
            direction: null,
        };
    }
}

export default FlashbackNode;
