import { div, h1, text } from 'frampton-dom/html/dom';

QUnit.module('Frampton.DOM.Html');

QUnit.test('Should corectly construct a VirtualNode', function(assert) {
  const actual = div({}, []);
  const expected = {
    ctor : 'VirtualNode',
    id : undefined,
    key : undefined,
    tagName : 'div',
    attributes : {},
    children : [],
    length : 0,
    mappings : []
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('Should corectly assign defaults', function(assert) {
  const actual = div();
  const expected = {
    ctor : 'VirtualNode',
    id : undefined,
    key : undefined,
    tagName : 'div',
    attributes : {},
    children : [],
    length : 0,
    mappings : []
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('Should corectly handle children', function(assert) {
  const actual = div({}, [ h1({}, [ text('test') ]) ]);
  const expected = {
    ctor : 'VirtualNode',
    id : undefined,
    key : undefined,
    tagName : 'div',
    attributes : {},
    children : [
      {
        ctor : 'VirtualNode',
        id : undefined,
        key : undefined,
        tagName : 'h1',
        attributes : {},
        children : [
          {
            ctor : 'VirtualText',
            text : 'test'
          }
        ],
        length : 1,
        mappings : []
      }
    ],
    length : 1,
    mappings : []
  };
  assert.deepEqual(actual, expected);
});
