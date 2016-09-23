/**
 * @name makeHandler
 * @method
 * @private
 * @memberof Frampton.DOM.Events.Utils
 */
export default function make_handler(messages, mappings, decorator) {
  return function(evt) {
    var value = decorator(evt);
    const len = mappings.length;
    for (let i = 0; i < len; i++) {
      value = mappings[i](value);
    }
    messages(value);
  };
}
