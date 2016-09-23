import isDefined from 'frampton-utils/is_defined';
import isUndefined from 'frampton-utils/is_undefined';
import isSomething from 'frampton-utils/is_something';
import warn from 'frampton-utils/warn';
import max from 'frampton-math/max';
import {
  insert,
  props,
  text,
  reorder,
  replace,
  remove
} from 'frampton-dom/virtual/patch';
import isNode from 'frampton-dom/utils/is_node';
import isText from 'frampton-dom/utils/is_text';
import propsDiff from 'frampton-dom/utils/props_diff';
import isSameNode from 'frampton-dom/utils/is_same_node';

function indexesMatch(oldIndex, newIndex) {
  return (
    isDefined(oldIndex) &&
    isDefined(newIndex) &&
    oldIndex === newIndex
  );
}

function diffTrees(oldTree, newTree) {
  var patch, newPatch;

  // Same reference, no need to do anything
  if (oldTree === newTree) {
    return;

  // New tree is a valid node
  } else if (isNode(newTree)) {
    if (isNode(oldTree)) {
      if (isSameNode(oldTree, newTree)) {
        const pDiff = propsDiff(oldTree, newTree);
        if (isSomething(pDiff)) {
          newPatch = props(newTree, pDiff);
        }
        patch = diffChildren(oldTree, newTree);
      } else {
        newPatch = replace(oldTree, newTree);
      }
    } else {
      newPatch = insert(null, newTree);
    }

  // Ooops, tree isn't a valid node
  } else {
    throw new Error('Root of DOM should be a VirtualNode');
  }

  if (newPatch) {
    patch = (patch || []);
    patch._p = newPatch;
  }

  return patch;
}

function diffChildren(oldNode, newNode) {

  // Same reference
  if (oldNode === newNode) { return; }

  const oldChildren = oldNode.children;
  const newChildren = newNode.children;
  const newLength = newChildren.length;
  const oldLength = oldChildren.length;
  const len = max(oldLength, newLength);
  const orderMap = [];
  const inserts = [];
  const newKeys = {};
  const oldKeys = {};
  let dirty = false;
  let parentPatch;

  // Create a map of keys to their new index O(n)
  for (let i = 0; i < newLength; i++) {
    let child = newChildren[i];
    if (isNode(child)) {
      const key = child.key;
      if (key) {
        newKeys[key] = i;
      }
    }
  }

  // Create a map of keys to their old index O(n)
  for (let i = 0; i < oldLength; i++) {
    let child = oldChildren[i];
    if (isNode(child)) {
      const key = child.key;
      if (key) {
        oldKeys[key] = i;
      }
    }
  }

  // O(n)
  for (let i = 0; i < len; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];
    let newIndex;
    let oldIndex;
    let newPatch;
    let patch;

    // We have a new node
    if (isNode(newChild)) {

      // Index of new node in previous DOM
      oldIndex = oldKeys[newChild.key];

      // We have an old node
      if (isNode(oldChild)) {

        // Index of old node in new DOM
        newIndex = newKeys[oldChild.key];

        // If old and new are the same, no changes
        if (indexesMatch(oldIndex, newIndex)) {
          orderMap[i] = i;
          const pDiff = propsDiff(oldChild, newChild);
          if (isSomething(pDiff)) {
            newPatch = props(newChild, pDiff);
          }
          patch = diffChildren(oldChild, newChild);
        } else {

          // Old node has no new index, delete it
          if (isUndefined(newIndex)) {
            dirty = true;
            if (oldChild.attributes.transitionOut) {
              orderMap[i] = remove(null, oldChild.attributes.transitionOut);
            } else {
              orderMap[i] = undefined;
            }

          // The index changed, we have a move
          } else if (newIndex !== i) {
            dirty = true;
            orderMap[i] = newIndex;
            const pDiff = propsDiff(oldChild, newChildren[newIndex]);
            if (isSomething(pDiff)) {
              newPatch = props(null, pDiff);
            }
            patch = diffChildren(oldChild, newChildren[newIndex]);
          }

          // The new node is an insert
          if (isUndefined(oldIndex)) {
            inserts[i] = insert(null, newChild);
          }
        }

      // We have no old node, or it is text
      } else if (isUndefined(oldIndex)) {
        dirty = true;
        orderMap[i] = undefined;
        inserts[i] = insert(null, newChild);
      }

    // New node is text
    } else if (isText(newChild)) {

      // Old node was text
      if (isText(oldChild)) {

        // Both nodes are text, index is the same
        orderMap[i] = i;

        // Text nodes are the same if they have same text, duh.
        if (oldChild.text !== newChild.text) {
          newPatch = text(oldChild, newChild.text);
        }

      // Old node was a node
      } else if (isNode(oldChild)) {
        dirty = true;
        newIndex = newKeys[oldChild.key];

        // Old node was deleted
        if (isUndefined(newIndex)) {
          if (oldChild.attributes.transitionOut) {
            orderMap[i] = remove(null, oldChild.attributes.transitionOut);
          } else {
            orderMap[i] = undefined;
          }

        // Old node was moved
        } else if (newIndex !== i) {
          orderMap[i] = newIndex;
          const pDiff = propsDiff(oldChild, newChildren[newIndex]);
          if (isSomething(pDiff)) {
            newPatch = props(newChildren[newIndex], pDiff);
          }
          patch = diffChildren(oldChild, newChildren[newIndex]);

        // Shouldn't happen
        } else {
          warn('Should not get here, new node is text');
        }

        inserts[i] = insert(null, newChild);

      // No old node, straight insert
      } else {
        inserts[i] = insert(null, newChild);
      }

    // If there is no new node here, index is vacant
    } else {

      // This is going to be dirty somehow
      dirty = true;

      // Index of old node in new DOM
      newIndex = newKeys[oldChild.key];

      if (isDefined(newIndex)) {
        dirty = true;
        orderMap[i] = newIndex;
        const pDiff = propsDiff(oldChild, newChildren[newIndex]);
        if (isSomething(pDiff)) {
          newPatch = props(newChildren[newIndex], pDiff);
        }
        patch = diffChildren(oldChild, newChildren[newIndex]);
      } else {
        if (oldChild.attributes.transitionOut) {
          orderMap[i] = remove(null, oldChild.attributes.transitionOut);
        } else {
          orderMap[i] = undefined;
        }
      }
    }

    if (newPatch) {
      patch = (patch || []);
      patch._p = newPatch;
    }

    if (patch) {
      parentPatch = (parentPatch || []);
      parentPatch[i] = patch;
    }
  }

  if (dirty) {
    parentPatch = (parentPatch || []);
    parentPatch._o = reorder(null, orderMap);
  }

  if (inserts.length > 0) {
    parentPatch = (parentPatch || []);
    parentPatch._i = inserts;
  }

  return parentPatch;
}

/**
 * @name diff
 * @param {Frampton.DOM.VirtualNode} oldTree The old virtual tree
 * @param {Frampton.DOM.VirtualNode} newTree The virtual tree to diff against
 * @param {Array} patch
 */
export default function diff(oldTree, newTree) {
  const patch = (diffTrees(oldTree, newTree) || []);
  return [patch];
}
