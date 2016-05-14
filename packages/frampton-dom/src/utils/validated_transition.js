import validatedClass from 'frampton-dom/utils/validated_class';
import emptyClass from 'frampton-dom/utils/empty_class';

export default function validated_transition(desc) {

  if (!desc) {
    return {
      class : emptyClass(),
      style : {}
    };
  }

  if (!desc.class) {
    desc.class = emptyClass();
  } else {
    desc.class = validatedClass(desc.class);
  }

  if (!desc.style) {
    desc.style = {};
  }

  return desc;
}
