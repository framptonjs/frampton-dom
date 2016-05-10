import diff from 'frampton-dom/utils/object_diff';

QUnit.module('Frampton.DOM.Utils.objectDiff');

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