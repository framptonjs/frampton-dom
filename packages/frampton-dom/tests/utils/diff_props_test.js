import diff from 'frampton-dom/utils/diff_props';

QUnit.module('Frampton.DOM.Utils.diffProps');

QUnit.test('Should correctly diff two objects', function() {
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
  const expectedDiff = {
    one : 'one two',
    two : undefined,
    four : 'four'
  };
  deepEqual(diff(oldProps, newProps), expectedDiff);
});

QUnit.test('Should correctly diff nested objects', function() {
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
  const expectedDiff = {
    one : 'one two',
    two : undefined,
    three : {
      eight : 'seven',
      ten : undefined,
      twelve : 'twelve'
    },
    four : 'four'
  };
  deepEqual(diff(oldProps, newProps), expectedDiff);
});

QUnit.test('Should correctly diff transitions', function() {
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
  const expectedDiff = {
    transition : {
      class : {
        add : ['forward'],
        remove : ['walk']
      },
      style : {
        background : undefined,
        color : 'red'
      }
    }
  };

  deepEqual(diff(oldProps, newProps), expectedDiff);
});

