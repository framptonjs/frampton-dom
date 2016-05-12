import diff from 'frampton-dom/utils/diff_class';

QUnit.module('Frampton.DOM.Utils.diffClass');

QUnit.test('Should correctly diff class strings with removes', function() {
  const oldClass = 'one two three four';
  const newClass = 'one two three';
  const expectedDiff = {
    add : [],
    remove : ['four']
  };
  deepEqual(diff(oldClass, newClass), expectedDiff);
});

QUnit.test('Should correctly diff class strings with adds', function() {
  const oldClass = 'one two three';
  const newClass = 'one two three four';
  const expectedDiff = {
    add : ['four'],
    remove : []
  };
  deepEqual(diff(oldClass, newClass), expectedDiff);
});

QUnit.test('Should correctly diff class strings with adds and removes', function() {
  const oldClass = 'one two three five';
  const newClass = 'one two three four';
  const expectedDiff = {
    add : ['four'],
    remove : ['five']
  };
  deepEqual(diff(oldClass, newClass), expectedDiff);
});

QUnit.test('Should correctly diff objects', function() {
  const oldClass = {
    add : ['one', 'two', 'three']
  };
  const newClass = {
    add : ['two', 'three']
  };
  const expectedDiff = {
    add : [],
    remove : ['one']
  };
  deepEqual(diff(oldClass, newClass), expectedDiff);
});
