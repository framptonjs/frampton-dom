import emptyClass from 'frampton-dom/utils/empty_class';

export default function empty_transition() {
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
}
