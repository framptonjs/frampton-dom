/*
 * @name removeNode
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} node
 */
export default function remove_node(node) {
  const parent = node.parentNode;
  if (parent) {
    parent.removeChild(node);
  }
}