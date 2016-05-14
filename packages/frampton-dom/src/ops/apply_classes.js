export default function apply_classes(node, diff) {
  if (diff.remove && (diff.remove.length > 0)) {
    node.classList.remove(...diff.remove);
  }

  if (diff.add && (diff.add.length > 0)) {
    node.classList.add(...diff.add);
  }
}