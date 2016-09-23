export default function apply_classes(node, diff) {
  const toAdd = (diff.add || []);
  const toRemove = (diff.remove || []);
  const addLen = toAdd.length;
  const removeLen = toRemove.length;

  if (removeLen > 0) {
    for (let i = 0; i < removeLen; i++) {
      node.classList.remove(toRemove[i]);
    }
  }

  if (addLen > 0) {
    for (let i = 0; i < addLen; i++) {
      node.classList.add(toAdd[i]);
    }
  }
}
