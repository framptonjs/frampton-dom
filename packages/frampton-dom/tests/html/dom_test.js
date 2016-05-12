import { div, h1, text } from 'frampton-dom/html/dom';

QUnit.module('Frampton.DOM.Html');

QUnit.test('Should corectly construct a VirtualNode', function() {
  const test = div({}, []);
  const expected = {
    ctor : 'VirtualNode',
    id : undefined,
    key : undefined,
    tagName : 'div',
    attributes : {},
    children : [],
    length : 0
  };
  deepEqual(test, expected);
});

QUnit.test('Should corectly assign defaults', function() {
  const test = div();
  const expected = {
    ctor : 'VirtualNode',
    id : undefined,
    key : undefined,
    tagName : 'div',
    attributes : {},
    children : [],
    length : 0
  };
  deepEqual(test, expected);
});

QUnit.test('Should corectly handle children', function() {
  const test = div({}, [ h1({}, [ text('test') ]) ]);
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
        length : 1
      }
    ],
    length : 1
  };
  deepEqual(test, expected);
});
