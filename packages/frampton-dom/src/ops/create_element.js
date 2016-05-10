import isText from 'frampton-dom/utils/is_text';
import applyAttributes from 'frampton-dom/ops/apply_attributes';

const doc = window.document;

/*
 * Take a VirtualNode and turns it into real DOM
 *
 * @name createElement
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {VirtualNode}
 * @returns {Element} A new HTML Element
 */
export default function create_element(vnode) {

  if (isText(vnode)) {
    return doc.createTextNode(vnode.text);
  }

  const children = vnode.children;
  const len = children.length;
  const node = doc.createElement(vnode.tagName);
  applyAttributes(node, vnode.attributes);

  for (let i = 0; i < len; i++) {
    const childNode = create_element(children[i]);
    if (childNode) {
      node.appendChild(childNode);
    }
  }

  return node;
}