import noop from 'frampton-utils/noop';
import diff from 'frampton-dom/diff';
import applyPatch from 'frampton-dom/ops/apply_patch';
import applyGlobals from 'frampton-dom/ops/apply_globals';

/**
 * @name update
 * @method
 * @memberof Frampton.DOM
 * @param {Object} config - The employee who is responsible for the project.
 * @param {Element} config.rootNode - The name of the employee.
 * @param {Function} config.messages - The employee's department.
 * @param {Frampton.DOM.VirtualNode} config.oldTree The old virtual dom
 * @param {Frampton.DOM.VirtualNode} config.newTree The new virtual dom
 */
export default function run_update(config) {
  const patch = diff(config.oldTree, config.newTree);
  applyPatch(patch, (config.messages || noop), config.rootNode, config.rootNode);
  applyGlobals(config.rootNode);
}
