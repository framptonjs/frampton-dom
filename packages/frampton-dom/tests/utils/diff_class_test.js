import diff from 'frampton-dom/utils/diff_class';

QUnit.module('Frampton.DOM.Utils.diffClass');

QUnit.test('Should correctly diff class strings with removes', function(assert) {
  const oldClass = 'one two three four';
  const newClass = 'one two three';
  const actual = diff(oldClass, newClass);
  const expected = {
    add : [],
    remove : ['four']
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly diff class strings with adds', function(assert) {
  const oldClass = 'one two three';
  const newClass = 'one two three four';
  const actual = diff(oldClass, newClass);
  const expected = {
    add : ['four'],
    remove : []
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly diff class strings with adds and removes', function(assert) {
  const oldClass = 'one two three five';
  const newClass = 'one two three four';
  const actual = diff(oldClass, newClass);
  const expected = {
    add : ['four'],
    remove : ['five']
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly diff objects', function(assert) {
  const oldClass = {
    add : ['one', 'two', 'three']
  };
  const newClass = {
    add : ['two', 'three']
  };
  const actual = diff(oldClass, newClass);
  const expected = {
    add : [],
    remove : ['one']
  };
  assert.deepEqual(actual, expected);
});
