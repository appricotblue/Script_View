import { LexicalComposer } from '@lexical/react/LexicalComposer';
import PropTypes from 'prop-types';

import SceneNode from '@/nodes/SceneNode';
import SubHeaderNode from '@/nodes/SubHeaderNode';
import SluglineNode from '@/nodes/SluglineNode';
import ActionNode from '@/nodes/ActionNode';
import { MentionNode } from '@/nodes/MentionNode';
import TransitionNode from '@/nodes/TransitionNode';
import DialogueContainerNode from '@/nodes/DialogueContainerNode';
import DialogueNode from '@/nodes/DialogueNode';
import ParentheticalNode from '@/nodes/ParentheticalNode';

const LexicalComposerProvider = ({ children }) => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [
      SceneNode,
      SubHeaderNode,
      SluglineNode,
      ActionNode,
      MentionNode,
      TransitionNode,
      DialogueContainerNode,
      DialogueNode,
      ParentheticalNode,
    ],
    theme: {
      text: {
        bold: 'text-bold',
        italic: 'text-italic',
        underline: 'text-underline',
      },
      subheader: 'subheader',
      scene: 'scene',
      slugline: 'slugline',
      action: 'action',
      dialogue: 'dialogue',
      parenthetical: 'parenthetical',
      transition: 'transition',
      dialogueContainer: 'dialogue-container',
    },
    onError: (e) => console.error(e),
  };

  return <LexicalComposer initialConfig={lexicalConfig}>{children}</LexicalComposer>;
};

LexicalComposerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LexicalComposerProvider;