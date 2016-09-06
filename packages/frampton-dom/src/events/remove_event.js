import immediate from 'frampton-utils/immediate';
import EVENT_MAP from 'frampton-dom/events/event_map';

/**
 * @name removeEvent
 * @method
 * @memberof Frampton.DOM.events
 * @private
 * @param {String} name
 * @param {Element} node
 */
export default function remove_event(name, node) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {
    node['on' + name] = null;
  });
}
