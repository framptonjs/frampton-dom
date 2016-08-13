export default function node_at_index(node, index) {
  if (node && node.childNodes) {
    return (node.childNodes[index] || null);
  } else {
    return null;
  }
}
