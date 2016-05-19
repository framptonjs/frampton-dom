import applyTransition from 'frampton-dom/ops/apply_transition';
import validatedTransition from 'frampton-dom/utils/validated_transition';

function handleTransition(node) {
  function eventHandler(evt) {
    if (evt.target === node) {
      node.removeEventListener('transitionend', eventHandler);
      node.removeAttribute('data-transition-in');
    }
  }
  node.addEventListener('transitionend', eventHandler);
}

export default function transitionIn(node, transition) {
  node.setAttribute('data-transition-in', 'true');
  applyTransition(node, validatedTransition(transition));
  handleTransition(node);
}
