import createElement from 'frampton-dom/ops/create_element';
import transitionIn from 'frampton-dom/utils/transition_in';

/*
 * @name insertNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} parent
 * @param {Element} current
 * @param {VirtualNode} vnode
 */
export default function insert_node(parent, current, vnode, messages) {
  const child = createElement(vnode, messages);
  if (vnode.attributes.transitionIn) {
    transitionIn(child, vnode.attributes.transitionIn);
  }
  if (parent) {
    if (current) {
      parent.insertBefore(child, current);
    } else {
      parent.appendChild(child);
    }
  }
}
