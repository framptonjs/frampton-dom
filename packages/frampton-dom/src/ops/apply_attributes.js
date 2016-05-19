import isNothing from 'frampton-utils/is_nothing';
import isObject from 'frampton-utils/is_object';
import warn from 'frampton-utils/warn';
import contains from 'frampton-list/contains';
import applyStyles from 'frampton-style/apply_styles';
import applyClasses from 'frampton-dom/ops/apply_classes';
import validatedClass from 'frampton-dom/utils/validated_class';
import validatedTransition from 'frampton-dom/utils/validated_transition';
import applyTransition from 'frampton-dom/ops/apply_transition';
import isEvent from 'frampton-dom/events/utils/is_event';
import { addEvent, removeEvent } from 'frampton-dom/events/event_dispatcher';

// Properties to not add to DOM node
const properties = [
  'key',
  'transitionIn',
  'transitionOut'
];

/**
 * @name applyAttributes
 * @param {Element} node Dom element to apply attributes to
 * @param {Object} attrs Hash of attributes to apply
 */
export default function apply_attributes(node, attrs) {
  for (const name in attrs) {
    const value = attrs[name];
    if (isNothing(value)) {
      if (isEvent(name)) {
        removeEvent(name, node);
      } else {
        node.removeAttribute(name);
      }
    } else {
      if (name === 'style') {
        if (isObject(value)) {
          applyStyles(node, value);
        } else {
          warn('Style attribute is not an object');
        }
      } else if (name === 'transition') {
        applyTransition(node, validatedTransition(value));
      } else if (name === 'class') {
        applyClasses(node, validatedClass(value));
      } else if (isEvent(name)) {
        addEvent(name, node, value);
      } else if (!contains(properties, name)) {
        node.setAttribute(name, value);
      }
    }
  }
}
