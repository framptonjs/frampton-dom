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
  const map = [];

  // Nodes in original order.
  for (let i = 0; i < len; i++) {
    arr.push(children[i]);
  }

  // Easy look up for what new indexes should be
  for (let i = 0; i < order.length; i++) {
    if (order[i] !== undefined) {
      map[order[i]] = i;
    }
  }

  for (let i = 0; i < len; i++) {
    if (order[i] === undefined) {
      current.removeChild(arr[i]);
    }

    let idx = map[i];
    let ref = current.childNodes[i];
    if (idx !== undefined) {
      let node = arr[idx];
      if (node && !ref) {
        current.appendChild(node);
      } else if (node && ref !== node) {
        current.insertBefore(node, ref);
      } else if (node && ref === node) {
      }
    }
  }
}
