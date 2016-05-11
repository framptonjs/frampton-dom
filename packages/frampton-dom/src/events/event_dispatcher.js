import getDocumentSignal from 'frampton-events/get_document_signal';
import eventContains from 'frampton-events/contains';
import immediate from 'frampton-utils/immediate';
import EVENT_MAP from 'frampton-dom/events/event_map';

/**

    {
      signal : Signal,
      nodes : [{
        node : node,
        handler : handler
      }]
    }

 */
const signalMap = {};


/**

    {
      node : node,
      events : ['click', 'focus']
    }

 */
const nodeList = [];


function removeNodeFromMap(name, node) {
  const entry = signalMap[name];
  if (entry) {
    const nodes = entry.nodes;
    const len = nodes.length;
    for (let i = 0; i < len; i++) {
      if (nodes[i].node === node) {
        nodes.splice(i, 1);
        return;
      }
    }
  }
}

function removeEventFromNode(name, node) {
  const len = nodeList.length;
  for (let i = 0; i < len; i++) {
    const nodeEntry = nodeList[i];
    if (nodeEntry.node === node) {
      const events = nodeEntry.events;
      const index = events.indexOf(name);
      if (index > -1) {
        events.splice(index, 1);
        if (events.length === 0) {
          nodeList.splice(i, 1);
        }
        return;
      }
    }
  }
}

function getNodeListEntry(node) {
  const len = nodeList.length;
  for (let i = 0; i < len; i++) {
    const handler = nodeList[i];
    if (handler.node === node) {
      return [handler, i];
    }
  }
  return null;
}

function removeEventsFromNode(node) {
  const nodeListEntry = getNodeListEntry(node);
  if (nodeListEntry) {
    const index = nodeListEntry[1];
    const events = nodeListEntry[0].events;
    const len = events.length;
    for (let i = 0; i < len; i++) {
      removeNodeFromMap(events[i], node);
    }
    nodeList.splice(index, 1);
  }
}

function childLength(node) {
  if (node && node.childNodes) {
    return node.childNodes.length;
  } else {
    return 0;
  }
}

function removeEventsFromTree(node) {
  const childLen = childLength(node);
  for (let i = 0; i < childLen; i++) {
    const child = node.childNodes[i];
    removeEventsFromTree(child);
  }
  removeEventsFromNode(node);
}

function getEntry(nodes, node) {
  const len = nodes.length;
  for (let i = 0; i < len; i++) {
    const entry = nodes[i];
    if (entry.node === node) {
      return entry;
    }
  }
  return null;
}

function getSignal(name, nodes) {
  const signal = getDocumentSignal(name)
    .map((evt) => {
      const len = nodes.length;
      for (let i = 0; i < len; i++) {
        if (eventContains(nodes[i].node, evt)) {
          nodes[i].handler(evt);
        }
      }
    });

  return signal;
}

function addEventToNode(name, node) {
  const entry = getNodeListEntry(node);
  if (!entry) {
    nodeList.push({
      node : node,
      events : [name]
    });
  } else {
    if (entry[0].events.indexOf(name) === -1) {
      entry.events.push(name);
    }
  }
}

export function addEvent(name, node, handler) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {

    var events = signalMap[name];

    if (!events) {
      const nodes = [];
      events = signalMap[name] = {
        signal : getSignal(name, nodes),
        nodes : nodes
      };
    }

    const entry = getEntry(events.nodes, node);

    if (!entry) {
      events.nodes.push({
        node : node,
        handler : handler
      });
    } else {
      entry.handler = handler;
    }

    addEventToNode(name, node);
  });
}

export function removeEvent(name, node) {
  name = (EVENT_MAP[name] || name);
  immediate(() => {
    removeNodeFromMap(name, node);
    removeEventFromNode(name, node);
  });
}

export function removeEvents(node) {
  immediate(() => {
    removeEventsFromTree(node);
  });
}