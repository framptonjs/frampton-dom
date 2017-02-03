import emptyClass from 'frampton-dom/utils/empty_class';
import emptyTransition from 'frampton-dom/utils/empty_transition';

QUnit.module('Frampton.DOM.Utils.emptyTransition');

QUnit.test('corrently creates object with from, to and cleanup blocks', function(assert) {
  const actual = emptyTransition();
  const expected = {
    props: [],
    from: {
      class: emptyClass(),
      style: {}
    },
    to: {
      class: emptyClass(),
      style: {}
    },
    cleanup: {
      class: emptyClass(),
      style: {}
    }
  };

  assert.deepEqual(actual, expected);
});
