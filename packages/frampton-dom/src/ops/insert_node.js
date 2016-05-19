import createElement from 'frampton-dom/ops/create_element';
import transitionIn from 'frampton-dom/utils/transition_in';

/*
 * @name insertNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} parent
 * @param {VirtualNode} vnode
 */
export default function insert_node(parent, current, vnode) {
  const newNode = createElement(vnode);
  if (vnode.attributes.transitionIn) {
    transitionIn(newNode, vnode.attributes.transitionIn);
  }
  if (parent) {
    if (current) {
      parent.insertBefore(newNode, current);
    } else {
      parent.appendChild(newNode);
    }
  }
}
