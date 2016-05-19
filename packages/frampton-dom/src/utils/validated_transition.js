import normalizedFrame from 'frampton-motion/normalized_frame';
import validatedClass from 'frampton-dom/utils/validated_class';
import emptyClass from 'frampton-dom/utils/empty_class';

export default function validated_transition(desc) {

  if (!desc) {
    return {
      from : {
        class : emptyClass(),
        style : {}
      },
      to : {
        class : emptyClass(),
        style : {}
      }
    };
  } else {

    let temp = {
      from : {},
      to : {}
    };

    if (desc.from) {
      temp.from.class = validatedClass(desc.from.class);
      temp.from.style = normalizedFrame(desc.from.style || {});
    }

    if (desc.to) {
      temp.to.class = validatedClass(desc.to.class);
      temp.to.style = normalizedFrame(desc.to.style || {});
    }

    if (desc.class) {
      temp.to.class = validatedClass((desc.class));
    }

    if (desc.style) {
      temp.to.style = normalizedFrame(desc.style || {});
    }

    return temp;
  }
}
