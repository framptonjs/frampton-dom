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

function nodeAtIndex(node, index) {
  if (node && node.childNodes) {
    return (node.childNodes[index] || null);
  } else {
    return null;
  }
}

/**
 * Nodes that are transitioning out should just be removed to get us in a good
 * state before performing the next set of updates.
 */
function resetChildState(node) {
  if (node && node.childNodes) {
    let children = node.childNodes;
    let len = children.length;
    for (let i = 0; i < len; i++) {
      let child = children[i];
      if (
        child &&
        child.nodeType === 1 &&
        child.getAttribute('data-transition-out') === 'true'
      ) {
        removeNode(child);
      }
    }
  }
}

function performInserts(current, patches) {

  const arr = [];
  const len = (current) ? current.childNodes.length : 0;

  for (let i = 0; i < len; i++) {
    let child = current.childNodes[i];
    // Filter out nodes that are transitioning out
    if (child.nodeType === 3 || child.getAttribute('data-transition-out') !== 'true') {
      arr.push(child);
    }
  }

  let cursor = 0;

  for (let key in patches) {
    if (!isNaN(key)) {
      let update = patches[key];
      executePatch(update, current, arr[(key - cursor)]);
      if (update.type === PATCHES.INSERT) { cursor += 1; }
    }
  }
}

/**
 * @name applyPatch
 * @param {Array} patch
 * @param {Element} parent
 * @param {Element} current
 */
export default function apply_patch(patch, parent, current) {

  resetChildState(current);

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
    performInserts(current, patch._i);
  }

  // Patch props and text
  if (patch._p) {
    executePatch(patch._p, parent, current);
  }
}
