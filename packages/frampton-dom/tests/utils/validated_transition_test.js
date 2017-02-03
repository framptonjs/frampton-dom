import emptyClass from 'frampton-dom/utils/empty_class';
import validatedTransition from 'frampton-dom/utils/validated_transition';

QUnit.module('Frampton.DOM.Utils.validatedTransition');

QUnit.test('returns an empty tranition for null', function(assert) {
  const actual = validatedTransition(null);
  const expected = {
    props: [],
    from: {
      class: emptyClass(),
      style: {}
    },
    to: {
      class: emptyClass(),
      style: {}
    },
    cleanup: {
      class: emptyClass(),
      style: {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('returns proper formatting for missing from/to blocks', function(assert) {
  const tansition = {
    class: 'test',
    style: {}
  };
  const actual = validatedTransition(tansition);
  const expected = {
    props: [],
    from: {
      class : emptyClass(),
      style : {}
    },
    to: {
      class: {
        add: ['test'],
        remove: []
      },
      style: {}
    },
    cleanup: {
      class: emptyClass(),
      style: {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('correctly formats class strings', function(assert) {
  const tansition = {
    from : {
      class : 'test',
      style : {}
    },
    to : {
      class : 'boo goo',
      style : {}
    }
  };
  const actual = validatedTransition(tansition);
  const expected = {
    props : [],
    from : {
      class : {
        add : ['test'],
        remove : []
      },
      style : {}
    },
    to : {
      class : {
        add : ['boo', 'goo'],
        remove : []
      },
      style : {}
    },
    cleanup: {
      class: emptyClass(),
      style: {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('correctly adds transitions props to props array', function(assert) {
  const tansition = {
    from : {
      style : {
        height : 0
      }
    },
    to : {
      style : {
        height : 10,
        opacity : 0
      }
    }
  };
  const actual = validatedTransition(tansition);
  const expected = {
    props : [ 'height', 'opacity' ],
    from : {
      class : {
        add : [],
        remove : []
      },
      style : {
        height : '0px'
      }
    },
    to : {
      class : {
        add : [],
        remove : []
      },
      style : {
        height : '10px',
        opacity : 0
      }
    },
    cleanup: {
      class: emptyClass(),
      style: {}
    }
  };

  assert.deepEqual(actual, expected);
});
