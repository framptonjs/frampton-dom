import PATCHES from 'frampton-dom/virtual/patch_types';
import removeNode from 'frampton-dom/ops/remove_node';
import replaceNode from 'frampton-dom/ops/replace_node';
import reorderNodes from 'frampton-dom/ops/reorder_nodes';
import insertNode from 'frampton-dom/ops/insert_node';
import updateText from 'frampton-dom/ops/update_text';
import applyAttributes from 'frampton-dom/ops/apply_attributes';

export default function execute_patch(patch, parentNode, currentNode) {

  const type = patch.type;
  const update = patch.update;

  switch (patch.type) {

    case PATCHES.NONE:
      break;

    case PATCHES.APPEND:
      return insertNode(parentNode, null, update);

    case PATCHES.INSERT:
      return insertNode(parentNode, currentNode, update);

    case PATCHES.REMOVE:
      return removeNode(currentNode);

    case PATCHES.REPLACE:
      return replaceNode(currentNode, update);

    case PATCHES.PROPS:
      return applyAttributes(currentNode, update);

    case PATCHES.TEXT:
      return updateText(currentNode, update);

    case PATCHES.REORDER:
      return reorderNodes(parentNode, currentNode, update);

    default:
      throw new Error('Unrecognized patch type: ' + type);
  }
}