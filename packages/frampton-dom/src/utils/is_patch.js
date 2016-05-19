import isObject from 'frampton-utils/is_object';

export default function is_patch(node) {
  return (
    isObject(node) &&
    node.ctor === 'VirtualPatch'
  );
}
