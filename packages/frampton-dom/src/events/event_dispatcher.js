import immediate from 'frampton-utils/immediate';
import EVENT_MAP from 'frampton-dom/events/event_map';
import nodeGate from 'frampton-dom/events/utils/node_gate';

/**
 * @name addEvent
 * @method
 * @memberof Frampton.DOM.events
 * @private
 * @param {String} name
 * @param {Element} node
 * @param {Function} handler
 */
export function addEvent(name, node, handler) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {

    // Transitionend events will not be fired for child nodes. The event must occur on this node.
    if (name === 'transitionend') {
      handler = nodeGate(node, handler);
    }

    node['on' + name] = handler;
  });
}

/**
 * @name removeEvent
 * @method
 * @memberof Frampton.DOM.events
 * @private
 * @param {String} name
 * @param {Element} node
 */
export function removeEvent(name, node) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {
    node['on' + name] = null;
  });
}
