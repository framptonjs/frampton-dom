import diff from 'frampton-dom/diff';
import applyPatch from 'frampton-dom/apply_patch';

/**
 * @param {Elemnt} rootNode The element to attach this update
 * @param {VirtualNode} oldTree The old virtual dom
 * @param {VirtualNode} newTree The new virtual dom
 */
export default function run_update(rootNode, oldTree, newTree) {
  const patch = diff(oldTree, newTree);
  console.log('update: patch: ', patch);
  applyPatch(patch, rootNode, rootNode);
}