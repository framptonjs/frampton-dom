import createElement from 'frampton-dom/ops/create_element';

/*
 * @name replaceNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} oldNode Node to replace
 * @param {VirtualNode} vnode VirtualNode representing replacement
 */
export default function replace_node(oldNode, vnode) {
  const parent = oldNode.parentNode;
  const newNode = createElement(vnode);
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}