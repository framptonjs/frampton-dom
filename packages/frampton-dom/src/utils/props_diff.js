import diffProps from 'frampton-dom/utils/diff_props';

export default function props_diff(oldNode, newNode) {
  return diffProps(oldNode.attributes, newNode.attributes);
}
