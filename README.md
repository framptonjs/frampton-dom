# Frampton-DOM

A virtual DOM library for use with frampton.js

### Install

```
npm install --save frampton
npm install --save frampton-dom
```

### Include

```
<script src="frampton.js"></script>
<script src="frampton-dom.js"></script>
```


## Building DOM

A virtual DOM is a tree. A valid virtual DOM must be rooted to a single node. Nodes are created with functions corresponding to HTML elements.

```
const { div, text } = Frampton.DOM.Html;

// Create a div
const el = div({ class : 'test' }, [ text('hello') ]);
```

Each function, with the exception of text, takes two parameters. The first parameter is an object of attributes to apply to the element. The second is an array of children. The text function creates text nodes and only takes the string to display.

### Events

Adding event listeners is done declaratively.

```
const { div, text } = Frampton.DOM.Html;

function clickHandler(evt) {
  console.log('hey, a click');
}

// Create a div
const el = div({ onClick : clickHandler }, [ text('hello') ]);
```

### Transitions

You can declaratively apply transitions to elements.

```
const { div, text } = Frampton.DOM.Html;

// A transition can be classes to add, or styles to apply
const insertTransition = {
  class : 'attachment-preview-in'
};

const removeTransition = {
  class : 'attachment-preview-out'
};

const attributes = {
  transitionIn : insertTransition,
  transitionOut : removeTransition
};

const el = div(attributes, [ text('hello') ]);
```


## Rendering

To apply your virtual DOM to the actual DOM use the update function.

```
const update = Frampton.DOM.update;
const { div, text } = Frampton.DOM.Html;
const rootElement = document.body;

const newTree = div({ class : 'test' }, [ text('hello') ]);

// The update function takes a root element to attach your virtual DOM to, the
// old virtual DOM to diff against and the new virtual DOM to apply.
// Initially we don't have an old tree.
update(rootElement, null, newTree);
```


## Finding the Difference in Trees

Finding the diff between objects can be expensive. We try not to run a diff if we don't have to. If two nodes are the same reference they are assumed to be the same and no changes are made. In fact we only go through the expense of diffing all the keys in a node if we are alerted that they are intended to be the same node. If two nodes are different references and there is no indication that they are meant to represent the same DOM node we replace the old node with the new node. To indicate that nodes in two virtual DOM trees are intended to be the same they must have the same id or the same key. Id is the usual DOM attribute and will be applied to the resulting DOM node. Key is a special parameter that will not be applied to the result DOM node. It is only used for diffing purposes.

```
const update = Frampton.DOM.update;
const { div, text } = Frampton.DOM.Html;
const rootElement = document.body;

// By using the same keys for each tree the nodes will just be updated. If the
// keys were different the DOM nodes would be replaced.
const treeOne =
  div({ key : 1, class : 'test' }, [
    div({ key : 2}, [ text('hello') ]
  ]);

const treeTwo =
  div({ key : 1, class : 'test' }, [
    div({ key : 2}, [ text('hello world') ]
  ]);

// The update function takes a root element to attach your virtual DOM to, the
// old virtual DOM to diff against and the new virtual DOM to apply.
// Initially we don't have an old tree.
update(rootElement, treeOne, treeTwo);
```
