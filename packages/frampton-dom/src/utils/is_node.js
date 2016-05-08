import isObject from 'frampton-utils/is_object';

export default function is_text(node) {
  return (
    isObject(node) &&
    node.ctor === 'VirtualNode'
  );
}