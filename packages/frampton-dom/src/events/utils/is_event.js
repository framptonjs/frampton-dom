import isSomething from 'frampton-utils/is_something';
import EVENT_MAP from 'frampton-dom/events/event_map';

export default function is_event(name) {
  return isSomething(EVENT_MAP[name]);
}