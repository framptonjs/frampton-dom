import emptyClass from 'frampton-dom/utils/empty_class';

QUnit.module('Frampton.DOM.Utils.emptyClass');

QUnit.test('corrently creates object with add and remove arrays', function(assert) {
  const actual = emptyClass();
  const expected = {
    add: [],
    remove: []
  };

  assert.deepEqual(actual, expected);
});
