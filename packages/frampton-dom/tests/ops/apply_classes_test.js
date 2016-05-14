import applyClasses from 'frampton-dom/ops/apply_classes';

QUnit.module('Frampton.DOM.Ops.applyClasses');

QUnit.test('Should correctly add classes to element', function() {

  const div = document.createElement('div');
  const diff = {
    add : ['test', 'this']
  };
  applyClasses(div, diff);
  ok(div.classList.contains('test'));
  ok(div.classList.contains('this'));
});

QUnit.test('Should correctly remove classes from element', function() {
  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    remove : ['test']
  };
  applyClasses(div, diff);
  notOk(div.classList.contains('test'));
  ok(div.classList.contains('this'));
});

QUnit.test('Should ignore empty diffs', function() {

  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    add : [],
    remove : []
  };
  applyClasses(div, diff);
  ok(div.classList.contains('test'));
  ok(div.classList.contains('this'));
});

QUnit.test('Should ignore null diffs', function() {

  const div = document.createElement('div');
  div.className = 'test this';
  const diff = {
    add : null,
    remove : null
  };
  applyClasses(div, diff);
  ok(div.classList.contains('test'));
  ok(div.classList.contains('this'));
});