import immediate from 'frampton-utils/immediate';
import EVENT_MAP from 'frampton-dom/events/event_map';
import nodeGate from 'frampton-dom/events/utils/node_gate';
import makeHandler from 'frampton-dom/events/utils/make_handler';

/**
 * @name addEvent
 * @method
 * @memberof Frampton.DOM.events
 * @private
 * @param {String} name
 * @param {Element} node
 * @param {Function} handler
 */
export default function add_event(name, node, messages, mappings, decorator) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {

    var handler = makeHandler(messages, mappings, decorator);

    // Transitionend events will not be fired for child nodes. The event must occur on this node.
    if (name === 'transitionend') {
      handler = nodeGate(node, handler);
    }

    node['on' + name] = handler;
  });
}
