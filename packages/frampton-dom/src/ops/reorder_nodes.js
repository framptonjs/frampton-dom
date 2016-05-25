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

  // Child nodes in original order.
  for (let i = 0; i < len; i++) {
    let child = children[i];
    if (child.nodeType === 1 && child.getAttribute('data-transition-out') === 'true') {
      remove.push(child);
    } else {
      arr.push(child);
    }
  }

  /**
   * Because transitions are applied asyncronously it is possible
   */
  for (let i = 0; i < remove.length; i++) {
    let child = remove[i];
    removeNode(child);
  }

  // Easy look up for what new indexes should be
  for (let i = 0; i < order.length; i++) {
    let next = order[i];
    if (next !== undefined && !isPatch(next)) {
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
      if (node && !ref) {
        current.appendChild(node);
      } else if (node && ref !== node) {
        current.insertBefore(node, ref);
      } else if (node && ref === node) {
        /* No move */
      }
    }
  }
}
