import normalizedFrame from 'frampton-dom/utils/normalized_frame';
import validatedClass from 'frampton-dom/utils/validated_class';
import emptyTransition from 'frampton-dom/utils/empty_transition';

const BLACKLIST = [
  'display',
  'transition',
  'transition-property',
  'transition-duration',
  'transition-delay',
  'transition-timing-function'
];

function shouldAddProp(transition, prop) {
  return (
    transition.props.indexOf(prop) === -1 &&
    BLACKLIST.indexOf(prop) === -1
  );
}

function isEmptyDesc(desc) {
  return (
    !desc.cleanup &&
    !desc.from &&
    !desc.to &&
    !desc.class &&
    !desc.style
  );
}

export default function validated_transition(desc) {

  if (!desc) {
    return emptyTransition();
  } else {

    const newTransition = emptyTransition();

    if (isEmptyDesc(desc)) {
      newTransition.to.style = normalizedFrame(desc || {});
    } else {
      if (desc.cleanup) {
        if (desc.cleanup.style || desc.cleanup.class) {
          newTransition.cleanup.class = validatedClass(desc.cleanup.class);
          newTransition.cleanup.style = normalizedFrame(desc.cleanup.style || {});
        } else {
          newTransition.cleanup.style = normalizedFrame(desc.cleanup || {});
        }
      }

      if (desc.from) {
        if (desc.from.style || desc.from.class) {
          newTransition.from.class = validatedClass(desc.from.class);
          newTransition.from.style = normalizedFrame(desc.from.style || {});
        } else {
          newTransition.from.style = normalizedFrame(desc.from || {});
        }
      }

      if (desc.to) {
        if (desc.to.style || desc.to.class) {
          newTransition.to.class = validatedClass(desc.to.class);
          newTransition.to.style = normalizedFrame(desc.to.style || {});
        } else {
          newTransition.to.style = normalizedFrame(desc.to || {});
        }
      }

      if (desc.class) {
        newTransition.to.class = validatedClass((desc.class));
      }

      if (desc.style) {
        newTransition.to.style = normalizedFrame(desc.style || {});
      }
    }

    for (let key in newTransition.to.style) {
      if (shouldAddProp(newTransition, key)) {
        newTransition.props.push(key);
      }
    }

    for (let key in newTransition.from.style) {
      if (shouldAddProp(newTransition, key)) {
        newTransition.props.push(key);
      }
    }

    return newTransition;
  }
}
