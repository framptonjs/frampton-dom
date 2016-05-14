import validatedClass from 'frampton-dom/utils/validated_class';

QUnit.module('Frampton.DOM.Utils.validatedClass');

QUnit.test('Should correctly convert string into object', function() {
  const className = 'test class here';
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  deepEqual(validatedClass(className), expected);
});

QUnit.test('Should correctly handle extra spaces', function() {
  const className = ' test     class  here  ';
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  deepEqual(validatedClass(className), expected);
});

QUnit.test('Should correctly handle empty strings', function() {
  const className = '';
  const expected = {
    add : [],
    remove : []
  };

  deepEqual(validatedClass(className), expected);
});
