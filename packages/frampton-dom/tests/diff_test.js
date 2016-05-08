import diff from 'frampton-dom/diff';
import TYPES from 'frampton-dom/virtual/patch_types';
import { div } from 'frampton-dom/html/dom';

QUnit.module('Frampton.DOM.diff');

QUnit.test('Should correctly diff two VirtualNodes', function() {

  const div_1 = div({}, []);
  const div_2 = div({}, [ div() ]);
  const expected = [];
  expected._p = {
    ctor : 'VirtualPatch',
    type : TYPES.REPLACE,
    node : {
      ctor : 'VirtualNode',
      tagName : 'div',
      attributes : {},
      children : [],
      length : 0
    },
    update : {
      ctor : 'VirtualNode',
      tagName : 'div',
      attributes : {},
      children : [{
        ctor : 'VirtualNode',
        tagName : 'div',
        attributes : {},
        children : [],
        length : 0
      }],
      length : 1
    }
  };

  deepEqual(diff(div_1, div_2), [expected]);
});