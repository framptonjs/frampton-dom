import createElement from 'frampton-dom/utils/create_element';

/*
 * @name insertNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} parent
 * @param {VirtualNode} vnode
 */
export default function insert_node(parent, vnode) {
  const newNode = createElement(vnode);
  if (parent) {
    parent.appendChild(newNode);
  }
}