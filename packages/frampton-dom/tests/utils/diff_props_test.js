import diff from 'frampton-dom/utils/diff_props';

QUnit.module('Frampton.DOM.Utils.diffProps');

QUnit.test('correctly diffs two objects', function(assert) {
  const oldProps = {
    one : 'one',
    two : 'two',
    three : 'three'
  };
  const newProps = {
    one : 'one two',
    three : 'three',
    four : 'four'
  };
  const actual = diff(oldProps, newProps);
  const expected = {
    one : 'one two',
    two : undefined,
    four : 'four'
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('correctly diffs nested objects', function(assert) {
  const oldProps = {
    one : 'one',
    two : {
      thrity : 'thirty'
    },
    three : {
      eight : 'eight',
      ten : 'ten'
    }
  };
  const newProps = {
    one : 'one two',
    three : {
      eight : 'seven',
      twelve : 'twelve'
    },
    four : 'four'
  };
  const actual = diff(oldProps, newProps);
  const expected = {
    one : 'one two',
    two : undefined,
    three : {
      eight : 'seven',
      ten : undefined,
      twelve : 'twelve'
    },
    four : 'four'
  };
  assert.deepEqual(actual, expected);
});

QUnit.test('correctly diffs transitions', function(assert) {
  const oldProps = {
    transition : {
      class : 'walk on',
      style : {
        background : 'black'
      }
    }
  };
  const newProps = {
    transition : {
      class : 'on forward',
      style : {
        color : 'red'
      }
    }
  };
  const actual = diff(oldProps, newProps);
  const expected = {
    transition : {
      props : [ 'color' ],
      to : {
        class : {
          add : [ 'forward' ],
          remove : [ 'walk' ]
        },
        style : {
          background : undefined,
          color : 'red'
        }
      }
    }
  };

  assert.deepEqual(actual, expected);
});
