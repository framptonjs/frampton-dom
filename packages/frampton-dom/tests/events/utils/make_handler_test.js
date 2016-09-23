import makeHandler from 'frampton-dom/events/utils/make_handler';

QUnit.module('Frampton.DOM.Events.Utils.makeHandler');

const mockEvent = {
  target : {
    value : 'Test'
  }
};

const mappingOne = (val) => val + ' run';
const mappingTwo = (val) => val + ' walk';

QUnit.test('Should correctly decorate event object', function(assert) {
  const messages = (val) => { assert.equal(val, 'Test'); };
  const eventValue = (evt) => evt.target.value;
  const handler = makeHandler(messages, [], eventValue);
  handler(mockEvent);
});

QUnit.test('Should correctly apply mapping functions', function(assert) {
  const messages = (val) => { assert.equal(val, 'Test run walk'); };
  const eventValue = (evt) => evt.target.value;
  const mappings = [mappingOne, mappingTwo];
  const handler = makeHandler(messages, mappings, eventValue);
  handler(mockEvent);
});
