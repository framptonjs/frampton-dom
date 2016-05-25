import createElement from 'frampton-dom/ops/create_element';
import { removeEvents } from 'frampton-dom/events/event_dispatcher';

/*
 * @name replaceNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} oldNode Node to replace
 * @param {VirtualNode} vnode VirtualNode representing replacement
 */
export default function replace_node(oldNode, vnode) {
  if (oldNode) {
    const parent = oldNode.parentNode;
    const newNode = createElement(vnode);
    if (parent) {
      removeEvents(oldNode);
      parent.replaceChild(newNode, oldNode);
    }
  }
}
