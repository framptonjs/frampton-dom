/**
 *  Only allow an event through if it's target is the given node
 */
export default function node_gate(node, fn) {
  return function(evt) {
    if (evt.target === node) {
      fn(evt);
    }
  };
}
