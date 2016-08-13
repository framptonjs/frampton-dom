import isNumber from 'frampton-utils/is_number';
import isPatch from 'frampton-dom/utils/is_patch';
import removeNode from 'frampton-dom/ops/remove_node';
import transitionOut from 'frampton-dom/utils/transition_out';

/*
 * @name reorderNodes
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} parent
 * @param {Array} order
 */
export default function reorder_nodes(parent, current, order) {

  const children = current.childNodes;
  const len = children.length;
  const arr = [];
  const remove = [];
  const map = [];

  /**
   * If child nodes were still transitioning out from a previous invokation of
   * reorderNodes they will not be in our diff and need to be removed. Otherwise
   * we collect a reference to the children in their original order.
   */
  for (let i = 0; i < len; i++) {
    const child = children[i];
    if (child.nodeType === 1 && child.getAttribute('data-transition-out') === 'true') {
      remove.push(child);
    } else {
      arr.push(child);
    }
  }

  /**
   * Because transitions are applied asyncronously it is possible for nodes
   * transitioning out to still be in the DOM but not in our virtual DOM.
   */
  for (let i = 0; i < remove.length; i++) {
    const child = remove[i];
    removeNode(child);
  }

  // Easy look up for what new indexes should be
  for (let i = 0; i < order.length; i++) {
    const next = order[i];
    if (isNumber(next)) {
      map[next] = i;
    }
  }

  /**
   * Cursor is used to keep our position when dealing with nodes that are
   * transitioning out, therefore still in the DOM but we don't want to
   * consider its position when inserting new elements.
   */
  let cursor = 0;

  for (let i = 0; i < len; i++) {

    const oldChild = arr[i];

    if (oldChild && order[i] === undefined) {
      removeNode(oldChild);
    }

    if (isPatch(order[i])) {
      transitionOut(oldChild, order[i].update);
      cursor += 1;
    }

    const newChildIndex = map[i];
    const ref = current.childNodes[(i + cursor)];

    if (newChildIndex !== undefined) {
      const node = arr[newChildIndex];

      // We have a new node, but no old node at this position.
      if (node && !ref) {
        current.appendChild(node);

      // We have an old node here, insert the new node before it.
      } else if (node && ref !== node) {
        current.insertBefore(node, ref);

      // Things stay the same.
      } else if (node && ref === node) {
        /* No move */
      }
    }
  }
}
