import length from 'frampton-list/length';
import isDefined from 'frampton-utils/is_defined';
import isArray from 'frampton-utils/is_array';
import isObject from 'frampton-utils/is_object';
import isString from 'frampton-utils/is_string';

const noChildren = [];
const noAttributes = {};

/**
 * @name VirtualNode
 * @memberof Frampton.DOM
 * @class
 * @private
 * @param {String} name Tag name for new node
 * @param {Object} attrs Attributes to apply to new node
 * @param {Array} children List of child nodes
 * @returns {VirtualNode} A new VirtualNode
 */
export default function VirtualNode(name, attrs, children) {

  if (!isString(name)) {
    throw new Error('VirtualNode must have a string name');
  }

  if (isArray(attrs)) { children = attrs; }

  attrs = isObject(attrs) ? attrs : noAttributes;
  children = isArray(children) ? children : noChildren;

  return {
    ctor : 'VirtualNode',
    id : attrs.id,
    key : (isDefined(attrs.key) ? attrs.key : attrs.id),
    tagName : name,
    attributes : attrs,
    children : children,
    length : length(children)
  };
}
