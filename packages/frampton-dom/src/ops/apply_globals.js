import isSomething from 'frampton-utils/is_something';

/**
 * We would like to apply some attributes after the DOM is constructed,
 * such as focus.
 */
export default function apply_globals(root) {
  const focused = root.querySelector('[data-fr-dom-focus="true"]');
  if (isSomething(focused) && focused.nodeType === 1) {
    focused.focus();
  }
}
