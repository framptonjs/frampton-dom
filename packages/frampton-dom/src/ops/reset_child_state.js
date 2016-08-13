import isDefined from 'frampton-utils/is_defined';
import removeNode from 'frampton-dom/ops/remove_node';

function isTransitioningOut(child) {
  return (
    isDefined(child) &&
    child.nodeType === 1 &&
    child.getAttribute('data-transition-out') === 'true'
  );
}

/**
 * Nodes that are transitioning out should just be removed to get us in a good
 * state before performing the next set of updates.
 */
export default function reset_child_state(node) {
  if (node && node.childNodes) {
    const children = node.childNodes;
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const child = children[i];
      if (isTransitioningOut(child)) {
        removeNode(child);
      }
    }
  }
}
