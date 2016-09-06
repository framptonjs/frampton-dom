import isNumeric from 'frampton-utils/is_numeric';
import PATCHES from 'frampton-dom/virtual/patch_types';
import executePatch from 'frampton-dom/ops/execute_patch';

/**
 * @name performInserts
 * @memberof Frampton.DOM.Ops
 * @private
 * @param {Element} current
 * @param {Object} patches
 */
export default function perform_inserts(current, patches, messages) {

  const arr = [];
  const len = (current) ? current.childNodes.length : 0;

  for (let i = 0; i < len; i++) {
    const child = current.childNodes[i];
    // Filter out nodes that are transitioning out
    if (child.nodeType === 3 || child.getAttribute('data-transition-out') !== 'true') {
      arr.push(child);
    }
  }

  let cursor = 0;

  for (let key in patches) {
    if (isNumeric(key)) {
      const update = patches[key];
      executePatch(update, messages, current, arr[(key - cursor)]);
      if (update.type === PATCHES.INSERT) {
        cursor += 1;
      }
    }
  }
}
