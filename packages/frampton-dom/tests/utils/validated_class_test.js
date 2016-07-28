import validatedClass from 'frampton-dom/utils/validated_class';

QUnit.module('Frampton.DOM.Utils.validatedClass');

QUnit.test('Should correctly convert string into object', function(assert) {
  const className = 'test class here';
  const actual = validatedClass(className);
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly handle extra spaces', function(assert) {
  const className = ' test     class  here  ';
  const actual = validatedClass(className);
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly handle empty strings', function(assert) {
  const className = '';
  const actual = validatedClass(className);
  const expected = {
    add : [],
    remove : []
  };

  assert.deepEqual(actual, expected);
});
