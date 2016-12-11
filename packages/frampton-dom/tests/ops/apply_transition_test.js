import applyTransition from 'frampton-dom/ops/apply_transition';
import validatedTransition from 'frampton-dom/utils/validated_transition';

QUnit.module('Frampton.DOM.Ops.applyTransition', {
  beforeEach() {
    const cssText = `
      #parent {
        margin: 0;
        padding: 0;
        height: 0;
        overflow: hidden;
      }
      #child {
        height: 200px;
      }
    `;
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.appendChild(document.createTextNode(cssText));
    this.fixture = document.getElementById('qunit-fixture');
    this.parent = document.createElement('div');
    this.child = document.createElement('div');
    this.parent.setAttribute('id', 'parent');
    this.child.setAttribute('id', 'child');
    document.body.appendChild(this.style);
    this.parent.appendChild(this.child);
    this.fixture.appendChild(this.parent);
  },
  afterEach() {
    document.body.removeChild(this.style);
    this.fixture.removeChild(this.parent);
    this.fixture = null;
    this.parent = null;
    this.child = null;
    this.style = null;
  }
});

QUnit.test('correctly handles auto value for height', function(assert) {
  assert.expect(1);
  const done = assert.async();
  const div = this.parent;
  const transition = {
    style : {
      height: 'auto',
      duration: '100ms'
    }
  };

  function handleTransitionEnd(evt) {
    if (evt.target === div) {
      div.removeEventListener('transitionend', handleTransitionEnd);
      assert.equal(div.offsetHeight, 200);
      done();
    }
  }

  div.addEventListener('transitionend', handleTransitionEnd);

  applyTransition(div, validatedTransition(transition));
});
