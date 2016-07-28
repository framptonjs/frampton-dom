import normalizedFrame from 'frampton-dom/utils/normalized_frame';
import validatedClass from 'frampton-dom/utils/validated_class';
import emptyTransition from 'frampton-dom/utils/empty_transition';

export default function validated_transition(desc) {

  if (!desc) {
    return emptyTransition();
  } else {

    const newTransition = emptyTransition();

    if (desc.from) {
      newTransition.from.class = validatedClass(desc.from.class);
      newTransition.from.style = normalizedFrame(desc.from.style || {});
    }

    if (desc.to) {
      newTransition.to.class = validatedClass(desc.to.class);
      newTransition.to.style = normalizedFrame(desc.to.style || {});
    }

    if (desc.class) {
      newTransition.to.class = validatedClass((desc.class));
    }

    if (desc.style) {
      newTransition.to.style = normalizedFrame(desc.style || {});
    }

    return newTransition;
  }
}
