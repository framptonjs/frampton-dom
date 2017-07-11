import isNothing from 'frampton-utils/is_nothing';
import isSomething from 'frampton-utils/is_something';
import isObject from 'frampton-utils/is_object';
import warn from 'frampton-utils/warn';
import contains from 'frampton-list/contains';
import applyStyles from 'frampton-dom/ops/apply_styles';
import applyClasses from 'frampton-dom/ops/apply_classes';
import validatedClass from 'frampton-dom/utils/validated_class';
import validatedTransition from 'frampton-dom/utils/validated_transition';
import applyTransition from 'frampton-dom/ops/apply_transition';
import isEvent from 'frampton-dom/events/utils/is_event';
import addEvent from 'frampton-dom/events/add_event';
import removeEvent from 'frampton-dom/events/remove_event';

// Properties to not add to DOM node
const blacklist =
  [ 'key'
  , 'transitionIn'
  , 'transitionOut'
  ];

/**
 * @name applyAttributes
 * @param {Element} node Dom element to apply attributes to
 * @param {VirtualNode} vnode VirtualNode representing this node
 * @param {Object} attrs Hash of attributes to apply
 * @param {Functon} messages Function to handle events
 */
export default function apply_attributes(node, vnode, attrs, messages) {
  for (const name in attrs) {
    const value = attrs[name];
    if (isNothing(value) || value === false) {
      if (isEvent(name)) {
        removeEvent(name, node);
      } else {

        if (name === 'focus') {
          node.removeAttribute('data-fr-dom-focus');

        } else if (name === 'html') {
          node.innerHTML = '';

        } else if (name === 'value') {
          node.value = '';

        } else if (name === 'checked') {
          node.checked = false;

        } else {
          node.removeAttribute(name);
        }
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

      } else if (name === 'focus') {
        node.setAttribute('data-fr-dom-focus', value);

      } else if (name === 'html') {
        node.innerHTML = value;

      } else if (name === 'value') {
        if (isSomething(node.selectionStart)) {
          const cursor = node.selectionStart;
          node.value = value;
          node.selectionStart = cursor;
          node.selectionEnd = cursor;

        } else {
          node.value = value;
        }

      } else if (name === 'checked') {
          node.checked = true;

      } else if (isEvent(name)) {
        addEvent(name, node, messages, vnode.mappings, value);

      } else if (!contains(blacklist, name)) {
        node.setAttribute(name, value);
      }
    }
  }
}
