import PATCHES from 'frampton-dom/virtual/patch_types';
import applyAttributes from 'frampton-dom/ops/apply_attributes';
import removeNode from 'frampton-dom/ops/remove_node';
import replaceNode from 'frampton-dom/ops/replace_node';
import insertNode from 'frampton-dom/ops/insert_node';
import updateText from 'frampton-dom/ops/update_text';

function patchOperation(patch, parentNode, currentNode) {
  const type = patch.type;
  const update = patch.update;
  switch(patch.type) {
    case PATCHES.NONE:
      break;
    case PATCHES.INSERT:
      return insertNode(parentNode, update);
    case PATCHES.REMOVE:
      return removeNode(currentNode);
    case PATCHES.REPLACE:
      return replaceNode(currentNode, update);
    case PATCHES.PROPS:
      return applyAttributes(currentNode, update);
    case PATCHES.TEXT:
      return updateText(currentNode, update);
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
  for (let key in patch) {
    if (key === '_p') {
      patchOperation(patch[key], parent, current);
    } else {
      const child = nodeAtIndex(current, key);
      apply_patch(patch[key], current, child);
    }
  }
}