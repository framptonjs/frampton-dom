import isNumeric from 'frampton-utils/is_numeric';
import nodeAtIndex from 'frampton-dom/utils/node_at_index';
import executePatch from 'frampton-dom/ops/execute_patch';
import performInserts from 'frampton-dom/ops/perform_inserts';
import resetChildState from 'frampton-dom/ops/reset_child_state';

/**
 * @name applyPatch
 * @param {Array} patch
 * @param {Element} parent
 * @param {Element} current
 */
export default function apply_patch(patch, messages, parent, current) {

  resetChildState(current);

  // Apply patches to child nodes
  for (let key in patch) {
    if (isNumeric(key)) {
      const child = nodeAtIndex(current, key);
      apply_patch(patch[key], messages, current, child);
    }
  }

  // Reorder child nodes
  if (patch._o) {
    executePatch(patch._o, messages, parent, current);
  }

  // Insert new nodes
  if (patch._i) {
    performInserts(current, patch._i, messages);
  }

  // Patch props and text
  if (patch._p) {
    executePatch(patch._p, messages, parent, current);
  }
}
