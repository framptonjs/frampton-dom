import removeNode from 'frampton-dom/ops/remove_node';
import applyTransition from 'frampton-dom/ops/apply_transition';
import validatedTransition from 'frampton-dom/utils/validated_transition';

function handleTransition(node) {
  function eventHandler(evt) {
    if (evt.target === node) {
      node.removeEventListener('transitionend', eventHandler);
      removeNode(node);
    }
  }
  node.addEventListener('transitionend', eventHandler);
}

export default function transitionOut(node, transition) {
  handleTransition(node);
  node.removeAttribute('data-transition-in');
  node.setAttribute('data-transition-out', 'true');
  applyTransition(node, validatedTransition(transition));
}
