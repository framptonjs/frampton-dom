import applyStyles from 'frampton-style/apply_styles';
import reflow from 'frampton-motion/reflow';
import normalizedFrame from 'frampton-motion/normalized_frame';
import immediate from 'frampton-utils/immediate';
import applyClasses from 'frampton-dom/ops/apply_classes';
import validatedClass from 'frampton-dom/utils/validated_class';

/**
 * @name applyTransition
 * @param {Element} node Dom element to apply transition to
 * @param {Object} desc An object describing the transition to make
 */
export default function apply_transition(node, desc) {
  immediate(() => {
    const endClasses = validatedClass(desc.class);
    const endFrame = normalizedFrame(desc.style || {});
    // Force a reflow to make sure we're in a good state
    reflow(node);
    applyClasses(node, endClasses);
    applyStyles(node, endFrame);
  });
}