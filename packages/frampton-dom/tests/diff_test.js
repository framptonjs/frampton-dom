import diff from 'frampton-dom/diff';
import TYPES from 'frampton-dom/virtual/patch_types';
import { div, article, ul, li, p, text } from 'frampton-dom/html/dom';

QUnit.module('Frampton.DOM.diff');

QUnit.test('returns empty array for no diff', function(assert) {
  const div_1 = div({ key : 'id-1' }, []);
  const div_2 = div({ key : 'id-1' }, []);
  const actual = diff(div_1, div_2);
  const expected = [[]];

  assert.deepEqual(actual, expected);
});

QUnit.test('returns empty array for same reference', function(assert) {
  const div_1 = div({ key : 'id-1' }, []);
  const actual = diff(div_1, div_1);
  const expected = [[]];

  assert.deepEqual(actual, expected);
});

QUnit.test('correctly diffs two unkeyed divs', function(assert) {

  const div_1 = div({}, []);
  const div_2 = div({}, [ div() ]);
  const actual = diff(div_1, div_2);
  const expected = [];
  expected._p = {
    ctor : 'VirtualPatch',
    type : TYPES.REPLACE,
    node : {
      ctor : 'VirtualNode',
      id : undefined,
      key : undefined,
      tagName : 'div',
      attributes : {},
      children : [],
      length : 0
    },
    update : {
      ctor : 'VirtualNode',
      id : undefined,
      key : undefined,
      tagName : 'div',
      attributes : {},
      children : [{
        ctor : 'VirtualNode',
        id : undefined,
        key : undefined,
        tagName : 'div',
        attributes : {},
        children : [],
        length : 0
      }],
      length : 1
    }
  };

  assert.deepEqual(actual, [expected]);
});

QUnit.test('correctly diffs two nested lists', function(assert) {

  const div_1 = div({ key : 'div-1' }, [
    article({ key : 'main-content' }, [
      p({ key : 'first-p' }, [ text('hello world') ]),
      ul({ key : 'ul-1' }, [
        li({ key : 'li-1' }, [
          p({ key : 'third-p' }, [ text('some text') ])
        ]),
        li({ key : 'li-2' }, [
          text('inside an li')
        ]),
        li({ key : 'li-3' }, [
          text('random text'),
          p({ key : 'second-p' }, [ text('more text') ]),
          ul({ key : 'ul-2' }, [
            li({ key : 'li-2-1' }, [ text('li text') ])
          ])
        ]),
        li({ key : 'li-4' }, [
          text('inside another li')
        ])
      ])
    ])
  ]);

  const div_2 = div({ key : 'div-1', class : 'test-class' }, [
    article({ key : 'main-content' }, [
      p({ key : 'first-p' }, [ text('hello world two') ]),
      ul({ key : 'ul-1' }, [
        li({ key : 'li-5' }, [
          text('a new li')
        ]),
        li({ key : 'li-3' }, [
          text('more random text'),
          p({ key : 'second-p' }, [ text('more text') ]),
          ul({ key : 'ul-2' }, [
            li({ key : 'li-2-2' }, [ text('li new text') ]),
            li({ key : 'li-2-1' }, [ text('li text') ])
          ])
        ]),
        li({ key : 'li-1' }, [
          p({ key : 'third-p' }, [ text('some text') ])
        ]),
        li({ key : 'li-4' }, [
          text('inside another li')
        ])
      ])
    ])
  ]);

  const expected = []; // div-1 is same
  expected[0] = []; // main-content is same
  expected[0]._p = {
    ctor : 'VirtualPatch',
    node : null,
    type : TYPES.PROPS,
    update : {
      class : {
        add : ['test-class'],
        remove : []
      }
    }
  };
  expected[0][0] = []; // first-p text change
  expected[0][0][0] = []; // diff for first-p text child
  expected[0][0][0]._p = {
    ctor : 'VirtualPatch',
    node : text('hello world'),
    type : TYPES.TEXT,
    update : 'hello world two'
  };

  expected[0][1] = []; // ul-1 has changes
  expected[0][1]._o = {
    ctor : 'VirtualPatch',
    node : null,
    type : TYPES.REORDER,
    update : [2, undefined, 1, 3]
  };
  expected[0][1]._i = []; // ul-1 inserts
  expected[0][1]._i[0] = {
    ctor : 'VirtualPatch',
    node : null,
    type : TYPES.INSERT,
    update : li({ key : 'li-5' }, [
      text('a new li')
    ])
  };

  expected[0][1][2] = []; // li-3 changes
  expected[0][1][2][0] = []; // text changes
  expected[0][1][2][0]._p = {
    ctor : 'VirtualPatch',
    type : TYPES.TEXT,
    node : text('random text'),
    update : 'more random text'
  };

  expected[0][1][2][2] = []; // ul-2 changes
  expected[0][1][2][2]._i = []; // ul-2 inserts
  expected[0][1][2][2]._i[0] = {
    ctor : 'VirtualPatch',
    node : null,
    type : TYPES.INSERT,
    update : li({ key : 'li-2-2' }, [
      text('li new text')
    ]),
  };
  expected[0][1][2][2]._o = {
    ctor : 'VirtualPatch',
    type : TYPES.REORDER,
    node : null,
    update : [1]
  };

  const actual = diff(div_1, div_2);

  assert.deepEqual(actual, [expected]);
});
