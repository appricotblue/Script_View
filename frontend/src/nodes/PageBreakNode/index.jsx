import './index2.scss';
// import './index.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import './index.css';
import './index2.scss';

import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical';
import { useCallback, useEffect } from 'react';

export function $createPageBreakNode() {
  return new PageBreakNode();
}

export function $isPageBreakNode(node) {
  return node instanceof PageBreakNode;
}

// PageBreakComponent.js
import React from 'react';

function PageBreakComponent({ nodeKey }) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (event) => {
      event.preventDefault();
      if (isSelected && $isNodeSelection($getSelection())) {
        const node = $getNodeByKey(nodeKey);
        if ($isPageBreakNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event) => {
          const pbElem = editor.getElementByKey(nodeKey);

          if (event.target === pbElem) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

  useEffect(() => {
    const pbElem = editor.getElementByKey(nodeKey);
    if (pbElem !== null) {
      pbElem.className = isSelected ? 'selected' : '';
    }
  }, [editor, isSelected, nodeKey]);

  return null;
}

// PageBreakNode.js
export class PageBreakNode extends DecoratorNode {
  static getType() {
    return 'page-break';
  }

  static clone(node) {
    return new PageBreakNode(node.__key);
  }

  static importJSON(serializedNode) {
    return $createPageBreakNode();
  }

  static importDOM() {
    return {
      figure: (domNode) => {
        const tp = domNode.getAttribute('type');
        if (tp !== this.getType()) return null;

        return {
          conversion: convertPageBreakElement,
          priority: COMMAND_PRIORITY_HIGH,
        };
      },
    };
  }

  exportJSON() {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  createDOM() {
    const el = document.createElement('div');
    el.style.pageBreakBefore = 'always';
    el.style.pageBreakAfter = 'avoid';
    el.setAttribute('type', this.getType());
    return el;
  }

  handleKeyDown(event) {
    const { editor } = this.context;
    if (event.key === 'Backspace' || event.key === 'Delete') {
      const selection = editor.getSelection();
      if (selection && selection.isCollapsed()) {
        const nodeBefore = selection.getFirstNode();
        const nodeAfter = selection.getLastNode();

        if (nodeBefore && nodeBefore.classList.contains('page-break')) {
          event.preventDefault();
          return;
        }

        if (nodeAfter && nodeAfter.classList.contains('page-break')) {
          event.preventDefault();
          return;
        }
      }
    }
  }

  getTextContent() {
    return '\n';
  }

  isInline() {
    return false;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return <PageBreakComponent nodeKey={this.__key} />;
  }
}

function convertPageBreakElement() {
  return { node: $createPageBreakNode() };
}
