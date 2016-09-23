import isNode from 'frampton-dom/utils/is_node';

function applyMapping(mapping, tree) {
  if (isNode(tree)) {
    const children = tree.children;
    const len = children.length;
    tree.mappings.push(mapping);
    for (let i = 0; i < len; i++) {
      const child = children[i];
      applyMapping(mapping, child);
    }
  }
}

export default function(mapping, tree) {
  applyMapping(mapping, tree);
  return tree;
}
