import createElement from 'frampton-dom/ops/create_element';

/*
 * @name insertNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} parent
 * @param {VirtualNode} vnode
 */
export default function insert_node(parent, current, update) {
  const newNode = createElement(update);
  if (parent) {
    if (current) {
      parent.insertBefore(newNode, current);
    } else {
      parent.appendChild(newNode);
    }
  }
}
