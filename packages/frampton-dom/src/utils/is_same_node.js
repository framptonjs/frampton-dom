import isDefined from 'frampton-utils/is_defined';

function keysMatch(oldKey, newKey) {
  return (
    isDefined(oldKey) &&
    isDefined(newKey) &&
    oldKey === newKey
  );
}

export default function is_same_node(oldNode, newNode) {
  return (
    (isDefined(oldNode) && isDefined(newNode)) &&
    (oldNode.tagName === newNode.tagName) &&
    (keysMatch(oldNode.key, newNode.key))
  );
}
