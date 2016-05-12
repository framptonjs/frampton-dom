import PATCHES from 'frampton-dom/virtual/patch_types';
import applyAttributes from 'frampton-dom/ops/apply_attributes';
import removeNode from 'frampton-dom/ops/remove_node';
import replaceNode from 'frampton-dom/ops/replace_node';
import reorderNodes from 'frampton-dom/ops/reorder_nodes';
import insertNode from 'frampton-dom/ops/insert_node';
import updateText from 'frampton-dom/ops/update_text';

function executePatch(patch, parentNode, currentNode) {
  const type = patch.type;
  const update = patch.update;
  switch(patch.type) {
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

function nodeAtIndex(node, index) {
  if (node && node.childNodes) {
    return (node.childNodes[index] || null);
  } else {
    return null;
  }
}

/**
 * @name applyPatch
 * @param {Array} patch
 * @param {Element} parent
 * @param {Element} current
 */
export default function apply_patch(patch, parent, current) {

  // Apply patches to child nodes
  for (let key in patch) {
    if (!isNaN(key)) {
      const child = nodeAtIndex(current, key);
      apply_patch(patch[key], current, child);
    }
  }

  // Reorder child nodes
  if (patch._o) {
    executePatch(patch._o, parent, current);
  }

  // Insert new nodes
  if (patch._i) {
    for (let key in patch._i) {
      if (!isNaN(key)) {
        executePatch(patch._i[key], current, nodeAtIndex(current, key));
      }
    }
  }

  // Patch props and text
  if (patch._p) {
    executePatch(patch._p, parent, current);
  }
}
