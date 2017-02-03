import applyClasses from 'frampton-dom/ops/apply_classes';

QUnit.module('Frampton.DOM.Ops.applyClasses');

QUnit.test('correctly adds classes to element', function(assert) {

  const div = document.createElement('div');
  const diff = {
    add : ['test', 'this']
  };
  applyClasses(div, diff);
  assert.ok(div.classList.contains('test'));
  assert.ok(div.classList.contains('this'));
});

QUnit.test('correctly removes classes from element', function(assert) {
  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    remove : ['test']
  };
  applyClasses(div, diff);
  assert.notOk(div.classList.contains('test'));
  assert.ok(div.classList.contains('this'));
});

QUnit.test('ignores empty diffs', function(assert) {

  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    add : [],
    remove : []
  };
  applyClasses(div, diff);
  assert.ok(div.classList.contains('test'));
  assert.ok(div.classList.contains('this'));
});

QUnit.test('ignores null diffs', function(assert) {

  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    add : null,
    remove : null
  };
  applyClasses(div, diff);
  assert.ok(div.classList.contains('test'));
  assert.ok(div.classList.contains('this'));
});
