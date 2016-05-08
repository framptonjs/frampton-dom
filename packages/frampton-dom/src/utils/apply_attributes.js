import isNothing from 'frampton-utils/is_nothing';
import isObject from 'frampton-utils/is_object';
import warn from 'frampton-utils/warn';
import applyStyles from 'frampton-style/apply_styles';

export default function apply_attributes(node, attrs) {
  for (const name in attrs) {
    const value = attrs[name];
    if (isNothing(value)) {
      node.removeAttribute(name);
    } else {
      if (name === 'style') {
        if (isObject(value)) {
          applyStyles(node, value);
        } else {
          warn('Style attribute is not an object');
        }
      }
      node.setAttribute(name, value);
    }
  }
}