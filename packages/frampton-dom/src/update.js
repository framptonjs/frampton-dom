import diff from 'frampton-dom/diff';
import applyPatch from 'frampton-dom/ops/apply_patch';

/**
 * @param {Elemnt} rootNode The element to attach this update
 * @param {Frampton.DOM.VirtualNode} oldTree The old virtual dom
 * @param {Frampton.DOM.VirtualNode} newTree The new virtual dom
 */
export default function run_update(rootNode, oldTree, newTree) {
  const patch = diff(oldTree, newTree);
  applyPatch(patch, rootNode, rootNode);
}
