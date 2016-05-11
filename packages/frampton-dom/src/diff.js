import isNothing from 'frampton-utils/is_nothing';
import isSomething from 'frampton-utils/is_something';
import max from 'frampton-math/max';
import {
  remove,
  insert,
  replace,
  props,
  text
} from 'frampton-dom/virtual/patch';
import isNode from 'frampton-dom/utils/is_node';
import isText from 'frampton-dom/utils/is_text';
import objectDiff from 'frampton-dom/utils/object_diff';

function keysMatch(oldKey, newKey) {
  return (
    oldKey !== undefined &&
    newKey !== undefined &&
    oldKey === newKey
  );
}

function isSameNode(oldNode, newNode) {
  return (
    oldNode.tagName === newNode.tagName &&
    (
      keysMatch(oldNode.attributes.key, newNode.attributes.key) ||
      keysMatch(oldNode.attributes.id, newNode.attributes.id)
    )
  );
}

function walk(oldNode, newNode) {
  var newPatch, patch;
  if (oldNode === newNode) {
    return;
  } else if (isNothing(newNode)) {
    newPatch = remove(oldNode, null);
  } else {
    if (isNode(newNode)) {
      if (isNode(oldNode)) {
        if (isSameNode(oldNode, newNode)) {
          const propsDiff = objectDiff(oldNode.attributes, newNode.attributes);
          if (isSomething(propsDiff)) {
            newPatch = props(oldNode, propsDiff);
          }
          patch = diffChildren(oldNode, newNode, patch);
        } else {
          newPatch = replace(oldNode, newNode);
        }
      } else {
        newPatch = insert(null, newNode);
      }
    } else if (isText(newNode)) {
      if (isText(oldNode)) {
        if (oldNode.text !== newNode.text) {
          newPatch = text(oldNode, newNode.text);
        }
      } else {
        newPatch = replace(oldNode, newNode);
      }
    } else if (isSomething(oldNode)) {
      newPatch = remove(oldNode, null);
    }
  }

  if (newPatch) {
    patch = (patch || []);
    patch._p = newPatch;
  }

  return patch;
}

function diffChildren(oldNode, newNode) {
  var patch;
  const oldChildren = oldNode.children;
  const newChildren = newNode.children;
  const len = max(oldChildren.length, newChildren.length);

  for (let i = 0; i < len; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];
    const newPatch = walk(oldChild, newChild);
    if (newPatch) {
      patch = (patch || []);
      patch[i] = newPatch;
    }
  }

  return patch;
}

/**
 * @name diff
 * @param {Frampton.DOM.VirtualNode} oldTree The old virtual tree
 * @param {Frampton.DOM.VirtualNode} newTree The virtual tree to diff against
 * @param {Array} patch
 */
export default function diff(oldTree, newTree) {
  const patch = (walk(oldTree, newTree) || []);
  return [patch];
}