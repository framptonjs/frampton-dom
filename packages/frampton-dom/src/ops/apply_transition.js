import setStyle from 'frampton-style/set_style';
import removeStyle from 'frampton-style/remove_style';
import reflow from 'frampton-dom/utils/reflow';
import normalizedFrame from 'frampton-dom/utils/normalized_frame';
import immediate from 'frampton-utils/immediate';
import applyStyles from 'frampton-dom/ops/apply_styles';
import applyClasses from 'frampton-dom/ops/apply_classes';
import validatedClass from 'frampton-dom/utils/validated_class';

function setupTransitionEnd(node, endFrame) {
  function eventHandler(evt) {
    if (evt.target === node) {
      if (endFrame.height === 'auto') {
        setStyle(node, 'height', 'auto');
      }

      if (endFrame.width === 'auto') {
        setStyle(node, 'width', 'auto');
      }

      node.removeEventListener('transitionend', eventHandler);
      node.removeAttribute('data-transition');
      removeStyle(node, 'transition-property');
    }
  }

  node.addEventListener('transitionend', eventHandler);
}

/**
 * @name applyTransition
 * @param {Element} node Dom element to apply transition to
 * @param {Object} desc An object describing the transition to make
 */
export default function apply_transition(node, desc) {
  const props = desc.props.join(',');
  const startClasses = validatedClass(desc.from.class);
  const startFrame = normalizedFrame(desc.from.style);

  immediate(() => {
    applyClasses(node, startClasses);
    applyStyles(node, startFrame, true);
    setStyle(node, 'transition-property', props);
    node.setAttribute('data-transition', 'true');
    // Force a reflow to make sure we're in a good state
    reflow(node);

    immediate(() => {
      const endClasses = validatedClass(desc.to.class);
      const endFrame = normalizedFrame(desc.to.style);

      setupTransitionEnd(node, endFrame);
      applyClasses(node, endClasses);
      applyStyles(node, endFrame, true);
    });
  });
}
