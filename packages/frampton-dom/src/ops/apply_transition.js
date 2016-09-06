import applyStyles from 'frampton-style/apply_styles';
import reflow from 'frampton-dom/utils/reflow';
import normalizedFrame from 'frampton-dom/utils/normalized_frame';
import immediate from 'frampton-utils/immediate';
import applyClasses from 'frampton-dom/ops/apply_classes';
import validatedClass from 'frampton-dom/utils/validated_class';

/**
 * @name applyTransition
 * @param {Element} node Dom element to apply transition to
 * @param {Object} desc An object describing the transition to make
 */
export default function apply_transition(node, desc) {

  const startClasses = validatedClass(desc.from.class);
  const startFrame = normalizedFrame(desc.from.style);
  applyClasses(node, startClasses);
  applyStyles(node, startFrame);

  immediate(() => {
    const endClasses = validatedClass(desc.to.class);
    const endFrame = normalizedFrame(desc.to.style);
    // Force a reflow to make sure we're in a good state
    reflow(node);
    applyClasses(node, endClasses);
    applyStyles(node, endFrame);
  });
}
