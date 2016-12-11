import emptyClass from 'frampton-dom/utils/empty_class';

export default function empty_transition() {
  return {
    props : [],
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
