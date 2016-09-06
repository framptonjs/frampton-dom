import makeHandler from 'frampton-dom/events/utils/make_handler';

QUnit.module('Frampton.DOM.Events.Utils.makeHandler');

const mockEvent = {
  target : {
    value : 'Test'
  }
};

QUnit.test('Should correctly decorate event object', function(assert) {
  const messages = (val) => { assert.equal(val, 'Test'); };
  const eventValue = (evt) => evt.target.value;
  const handler = makeHandler(messages, eventValue);
  handler(mockEvent);
});
