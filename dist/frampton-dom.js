(function() {
/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  };

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

}());
define('frampton-dom', ['exports', 'frampton/namespace', 'frampton-dom/diff', 'frampton-dom/update', 'frampton-dom/html/dom'], function (exports, _framptonNamespace, _framptonDomDiff, _framptonDomUpdate, _framptonDomHtmlDom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Frampton = _interopRequireDefault(_framptonNamespace);

  var _diff = _interopRequireDefault(_framptonDomDiff);

  var _update = _interopRequireDefault(_framptonDomUpdate);

  /**
   * @name DOM
   * @namespace
   * @memberof Frampton
   */
  _Frampton['default'].DOM = {};
  _Frampton['default'].DOM.VERSION = '0.0.2';
  _Frampton['default'].DOM.diff = _diff['default'];
  _Frampton['default'].DOM.update = _update['default'];

  /**
   * @name Html
   * @namespace
   * @memberof Frampton.DOM
   */
  _Frampton['default'].DOM.Html = {};
  // PRIMITIVES
  _Frampton['default'].DOM.Html.node = _framptonDomHtmlDom.node;
  _Frampton['default'].DOM.Html.text = _framptonDomHtmlDom.text;
  // MAIN
  _Frampton['default'].DOM.Html.div = _framptonDomHtmlDom.div;
  _Frampton['default'].DOM.Html.span = _framptonDomHtmlDom.span;
  _Frampton['default'].DOM.Html.p = _framptonDomHtmlDom.p;
  _Frampton['default'].DOM.Html.header = _framptonDomHtmlDom.header;
  _Frampton['default'].DOM.Html.footer = _framptonDomHtmlDom.footer;
  _Frampton['default'].DOM.Html.article = _framptonDomHtmlDom.article;
  _Frampton['default'].DOM.Html.section = _framptonDomHtmlDom.section;
  _Frampton['default'].DOM.Html.aside = _framptonDomHtmlDom.aside;
  _Frampton['default'].DOM.Html.main = _framptonDomHtmlDom.main;
  // LISTS
  _Frampton['default'].DOM.Html.ul = _framptonDomHtmlDom.ul;
  _Frampton['default'].DOM.Html.ol = _framptonDomHtmlDom.ol;
  _Frampton['default'].DOM.Html.li = _framptonDomHtmlDom.li;
  // HEADINGS
  _Frampton['default'].DOM.Html.h1 = _framptonDomHtmlDom.h1;
  _Frampton['default'].DOM.Html.h2 = _framptonDomHtmlDom.h2;
  _Frampton['default'].DOM.Html.h3 = _framptonDomHtmlDom.h3;
  _Frampton['default'].DOM.Html.h4 = _framptonDomHtmlDom.h4;
  _Frampton['default'].DOM.Html.h5 = _framptonDomHtmlDom.h5;
  _Frampton['default'].DOM.Html.h6 = _framptonDomHtmlDom.h6;
  // FORMATTING
  _Frampton['default'].DOM.Html.strong = _framptonDomHtmlDom.strong;
  _Frampton['default'].DOM.Html.em = _framptonDomHtmlDom.em;
  _Frampton['default'].DOM.Html.pre = _framptonDomHtmlDom.pre;
  _Frampton['default'].DOM.Html.a = _framptonDomHtmlDom.a;
  // FORMS
  _Frampton['default'].DOM.Html.legend = _framptonDomHtmlDom.legend;
  _Frampton['default'].DOM.Html.fieldset = _framptonDomHtmlDom.fieldset;
  _Frampton['default'].DOM.Html.input = _framptonDomHtmlDom.input;
  _Frampton['default'].DOM.Html.button = _framptonDomHtmlDom.button;
  _Frampton['default'].DOM.Html.textarea = _framptonDomHtmlDom.textarea;
  _Frampton['default'].DOM.Html.option = _framptonDomHtmlDom.option;
  _Frampton['default'].DOM.Html.optgroup = _framptonDomHtmlDom.optgroup;
  _Frampton['default'].DOM.Html.select = _framptonDomHtmlDom.select;
  // MEDIA
  _Frampton['default'].DOM.Html.figure = _framptonDomHtmlDom.figure;
  _Frampton['default'].DOM.Html.img = _framptonDomHtmlDom.img;
  _Frampton['default'].DOM.Html.video = _framptonDomHtmlDom.video;
  _Frampton['default'].DOM.Html.audio = _framptonDomHtmlDom.audio;
  _Frampton['default'].DOM.Html.source = _framptonDomHtmlDom.source;
  _Frampton['default'].DOM.Html.figcaption = _framptonDomHtmlDom.figcaption;
});
define('frampton-dom/diff', ['exports', 'module', 'frampton-utils/is_nothing', 'frampton-utils/is_something', 'frampton-math/max', 'frampton-dom/virtual/patch', 'frampton-dom/utils/is_node', 'frampton-dom/utils/is_text', 'frampton-dom/utils/object_diff'], function (exports, module, _framptonUtilsIs_nothing, _framptonUtilsIs_something, _framptonMathMax, _framptonDomVirtualPatch, _framptonDomUtilsIs_node, _framptonDomUtilsIs_text, _framptonDomUtilsObject_diff) {
  'use strict';

  module.exports = diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isNothing = _interopRequireDefault(_framptonUtilsIs_nothing);

  var _isSomething = _interopRequireDefault(_framptonUtilsIs_something);

  var _max = _interopRequireDefault(_framptonMathMax);

  var _isNode = _interopRequireDefault(_framptonDomUtilsIs_node);

  var _isText = _interopRequireDefault(_framptonDomUtilsIs_text);

  var _objectDiff = _interopRequireDefault(_framptonDomUtilsObject_diff);

  function keysMatch(oldKey, newKey) {
    return oldKey !== undefined && newKey !== undefined && oldKey === newKey;
  }

  function isSameNode(oldNode, newNode) {
    return oldNode.tagName === newNode.tagName && (keysMatch(oldNode.attributes.key, newNode.attributes.key) || keysMatch(oldNode.attributes.id, newNode.attributes.id));
  }

  function walk(oldNode, newNode) {
    var newPatch, patch;
    if (oldNode === newNode) {
      return;
    } else if (_isNothing['default'](newNode)) {
      newPatch = _framptonDomVirtualPatch.remove(oldNode, null);
    } else {
      if (_isNode['default'](newNode)) {
        if (_isNode['default'](oldNode)) {
          if (isSameNode(oldNode, newNode)) {
            var propsDiff = _objectDiff['default'](oldNode.attributes, newNode.attributes);
            if (_isSomething['default'](propsDiff)) {
              newPatch = _framptonDomVirtualPatch.props(oldNode, propsDiff);
            }
            patch = diffChildren(oldNode, newNode, patch);
          } else {
            newPatch = _framptonDomVirtualPatch.replace(oldNode, newNode);
          }
        } else {
          newPatch = _framptonDomVirtualPatch.insert(null, newNode);
        }
      } else if (_isText['default'](newNode)) {
        if (_isText['default'](oldNode)) {
          if (oldNode.text !== newNode.text) {
            newPatch = _framptonDomVirtualPatch.text(oldNode, newNode.text);
          }
        } else {
          newPatch = _framptonDomVirtualPatch.replace(oldNode, newNode);
        }
      } else if (_isSomething['default'](oldNode)) {
        newPatch = _framptonDomVirtualPatch.remove(oldNode, null);
      }
    }

    if (newPatch) {
      patch = patch || [];
      patch._p = newPatch;
    }

    return patch;
  }

  function diffChildren(oldNode, newNode) {
    var patch;
    var oldChildren = oldNode.children;
    var newChildren = newNode.children;
    var len = _max['default'](oldChildren.length, newChildren.length);

    for (var i = 0; i < len; i++) {
      var oldChild = oldChildren[i];
      var newChild = newChildren[i];
      var newPatch = walk(oldChild, newChild);
      if (newPatch) {
        patch = patch || [];
        patch[i] = newPatch;
      }
    }

    return patch;
  }

  /**
   * @name diff
   * @param {Frampton.DOM.VirtualNode} oldTree The old virtual tree
   * @param {Frampton.DOM.VirtualNode} newTree The virtual tree to diff against
   * @param {Array} patch
   */

  function diff(oldTree, newTree) {
    var patch = walk(oldTree, newTree) || [];
    return [patch];
  }
});
define('frampton-dom/events/event_dispatcher', ['exports', 'frampton-events/get_document_signal', 'frampton-events/contains', 'frampton-utils/immediate', 'frampton-dom/events/event_map'], function (exports, _framptonEventsGet_document_signal, _framptonEventsContains, _framptonUtilsImmediate, _framptonDomEventsEvent_map) {
  'use strict';

  exports.__esModule = true;
  exports.addEvent = addEvent;
  exports.removeEvent = removeEvent;
  exports.removeEvents = removeEvents;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _getDocumentSignal = _interopRequireDefault(_framptonEventsGet_document_signal);

  var _eventContains = _interopRequireDefault(_framptonEventsContains);

  var _immediate = _interopRequireDefault(_framptonUtilsImmediate);

  var _EVENT_MAP = _interopRequireDefault(_framptonDomEventsEvent_map);

  /**
  
      {
        signal : Signal,
        nodes : [{
          node : node,
          handler : handler
        }]
      }
  
   */
  var signalMap = {};

  /**
  
      {
        node : node,
        events : ['click', 'focus']
      }
  
   */
  var nodeList = [];

  function removeNodeFromMap(name, node) {
    var entry = signalMap[name];
    if (entry) {
      var nodes = entry.nodes;
      var len = nodes.length;
      for (var i = 0; i < len; i++) {
        if (nodes[i].node === node) {
          nodes.splice(i, 1);
          return;
        }
      }
    }
  }

  function removeEventFromNode(name, node) {
    var len = nodeList.length;
    for (var i = 0; i < len; i++) {
      var nodeEntry = nodeList[i];
      if (nodeEntry.node === node) {
        var events = nodeEntry.events;
        var index = events.indexOf(name);
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
    var len = nodeList.length;
    for (var i = 0; i < len; i++) {
      var handler = nodeList[i];
      if (handler.node === node) {
        return [handler, i];
      }
    }
    return null;
  }

  function removeEventsFromNode(node) {
    var nodeListEntry = getNodeListEntry(node);
    if (nodeListEntry) {
      var index = nodeListEntry[1];
      var events = nodeListEntry[0].events;
      var len = events.length;
      for (var i = 0; i < len; i++) {
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
    var childLen = childLength(node);
    for (var i = 0; i < childLen; i++) {
      var child = node.childNodes[i];
      removeEventsFromTree(child);
    }
    removeEventsFromNode(node);
  }

  function getEntry(nodes, node) {
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
      var entry = nodes[i];
      if (entry.node === node) {
        return entry;
      }
    }
    return null;
  }

  function getSignal(name, nodes) {
    var signal = _getDocumentSignal['default'](name).map(function (evt) {
      var len = nodes.length;
      for (var i = 0; i < len; i++) {
        if (_eventContains['default'](nodes[i].node, evt)) {
          nodes[i].handler(evt);
        }
      }
    });

    return signal;
  }

  function addEventToNode(name, node) {
    var entry = getNodeListEntry(node);
    if (!entry) {
      nodeList.push({
        node: node,
        events: [name]
      });
    } else {
      if (entry[0].events.indexOf(name) === -1) {
        entry.events.push(name);
      }
    }
  }

  function addEvent(name, node, handler) {
    name = _EVENT_MAP['default'][name] || name;
    _immediate['default'](function () {

      var events = signalMap[name];

      if (!events) {
        var nodes = [];
        events = signalMap[name] = {
          signal: getSignal(name, nodes),
          nodes: nodes
        };
      }

      var entry = getEntry(events.nodes, node);

      if (!entry) {
        events.nodes.push({
          node: node,
          handler: handler
        });
      } else {
        entry.handler = handler;
      }

      addEventToNode(name, node);
    });
  }

  function removeEvent(name, node) {
    name = _EVENT_MAP['default'][name] || name;
    _immediate['default'](function () {
      removeNodeFromMap(name, node);
      removeEventFromNode(name, node);
    });
  }

  function removeEvents(node) {
    _immediate['default'](function () {
      removeEventsFromTree(node);
    });
  }
});
define('frampton-dom/events/event_map', ['exports', 'module'], function (exports, module) {
  /**
   * Mappind of attribute handlers to event name.
   * @name eventMap
   */
  'use strict';

  module.exports = {
    onClick: 'click',
    onMouseOver: 'mouseover',
    onMouseOut: 'mouseout',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onFocus: 'focus',
    onBlur: 'blur',
    onSubmit: 'submit',
    onLoad: 'load',
    onAbort: 'abort',
    onError: 'error',
    onResize: 'resize',
    onTouchStart: 'touchstart',
    onTouchEnd: 'touchend',
    onTouchMove: 'touchmove',
    onTouchEnter: 'touchenter',
    onTouchLeave: 'touchleave',
    onTouchCancel: 'touchcancel',
    onSelect: 'select',
    onChange: 'change',
    onInput: 'input',
    onKeyUp: 'keyup',
    onKeyDown: 'keydown',
    onKeyPress: 'keypress',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragEnter: 'dragenter',
    onDragLeave: 'dragleave',
    onDragOver: 'dragover',
    onDragStart: 'dragstart',
    onDrop: 'drop',
    onCanPlay: 'canplay',
    onAudioStart: 'audiostart',
    onAudioEnd: 'audioend',
    onSeeked: 'seeked',
    onSeeking: 'seeking',
    onPlay: 'play',
    onPlaying: 'playing',
    onPause: 'pause',
    onTimeUpdate: 'timeupdate',
    onEnded: 'ended',
    onStalled: 'stalled',
    onScroll: 'scroll',
    onWheel: 'wheel',
    onTransitionEnd: 'transitionend'
  };
});
define('frampton-dom/events/utils/is_event', ['exports', 'module', 'frampton-utils/is_something', 'frampton-dom/events/event_map'], function (exports, module, _framptonUtilsIs_something, _framptonDomEventsEvent_map) {
  'use strict';

  module.exports = is_event;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isSomething = _interopRequireDefault(_framptonUtilsIs_something);

  var _EVENT_MAP = _interopRequireDefault(_framptonDomEventsEvent_map);

  function is_event(name) {
    return _isSomething['default'](_EVENT_MAP['default'][name]);
  }
});
define('frampton-dom/html/dom', ['exports', 'frampton-dom/virtual/node', 'frampton-dom/virtual/text'], function (exports, _framptonDomVirtualNode, _framptonDomVirtualText) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _vnode = _interopRequireDefault(_framptonDomVirtualNode);

  var _vtext = _interopRequireDefault(_framptonDomVirtualText);

  // GENERIC DOM NODE

  var node = function node(name, attrs, children) {
    return _vnode['default'](name, attrs, children);
  };

  exports.node = node;
  // TEXT NODE

  var text = function text(value) {
    return _vtext['default'](value);
  };

  exports.text = text;
  // MAIN TAGS

  var div = function div(attrs, children) {
    return _vnode['default']('div', attrs, children);
  };

  exports.div = div;
  var span = function span(attrs, children) {
    return _vnode['default']('span', attrs, children);
  };

  exports.span = span;
  var header = function header(attrs, children) {
    return _vnode['default']('header', attrs, children);
  };

  exports.header = header;
  var footer = function footer(attrs, children) {
    return _vnode['default']('footer', attrs, children);
  };

  exports.footer = footer;
  var article = function article(attrs, children) {
    return _vnode['default']('article', attrs, children);
  };

  exports.article = article;
  var section = function section(attrs, children) {
    return _vnode['default']('section', attrs, children);
  };

  exports.section = section;
  var aside = function aside(attrs, children) {
    return _vnode['default']('aside', attrs, children);
  };

  exports.aside = aside;
  var main = function main(attrs, children) {
    return _vnode['default']('main', attrs, children);
  };

  exports.main = main;
  var p = function p(attrs, children) {
    return _vnode['default']('p', attrs, children);
  };

  exports.p = p;
  var a = function a(attrs, children) {
    return _vnode['default']('a', attrs, children);
  };

  exports.a = a;
  // HEADINGS

  var h1 = function h1(attrs, children) {
    return _vnode['default']('h1', attrs, children);
  };

  exports.h1 = h1;
  var h2 = function h2(attrs, children) {
    return _vnode['default']('h2', attrs, children);
  };

  exports.h2 = h2;
  var h3 = function h3(attrs, children) {
    return _vnode['default']('h3', attrs, children);
  };

  exports.h3 = h3;
  var h4 = function h4(attrs, children) {
    return _vnode['default']('h4', attrs, children);
  };

  exports.h4 = h4;
  var h5 = function h5(attrs, children) {
    return _vnode['default']('h5', attrs, children);
  };

  exports.h5 = h5;
  var h6 = function h6(attrs, children) {
    return _vnode['default']('h6', attrs, children);
  };

  exports.h6 = h6;
  // LISTS

  var ul = function ul(attrs, children) {
    return _vnode['default']('ul', attrs, children);
  };

  exports.ul = ul;
  var ol = function ol(attrs, children) {
    return _vnode['default']('ol', attrs, children);
  };

  exports.ol = ol;
  var li = function li(attrs, children) {
    return _vnode['default']('li', attrs, children);
  };

  exports.li = li;
  // MEDIA

  var img = function img(attrs, children) {
    return _vnode['default']('img', attrs, children);
  };

  exports.img = img;
  var video = function video(attrs, children) {
    return _vnode['default']('video', attrs, children);
  };

  exports.video = video;
  var audio = function audio(attrs, children) {
    return _vnode['default']('audio', attrs, children);
  };

  exports.audio = audio;
  var source = function source(attrs, children) {
    return _vnode['default']('source', attrs, children);
  };

  exports.source = source;
  var figure = function figure(attrs, children) {
    return _vnode['default']('figure', attrs, children);
  };

  exports.figure = figure;
  var figcaption = function figcaption(attrs, children) {
    return _vnode['default']('figcaption', attrs, children);
  };

  exports.figcaption = figcaption;
  // FORMS

  var legend = function legend(attrs, children) {
    return _vnode['default']('legend', attrs, children);
  };

  exports.legend = legend;
  var fieldset = function fieldset(attrs, children) {
    return _vnode['default']('fieldset', attrs, children);
  };

  exports.fieldset = fieldset;
  var option = function option(attrs, children) {
    return _vnode['default']('option', attrs, children);
  };

  exports.option = option;
  var optgroup = function optgroup(attrs, children) {
    return _vnode['default']('optgroup', attrs, children);
  };

  exports.optgroup = optgroup;
  var label = function label(attrs, children) {
    return _vnode['default']('label', attrs, children);
  };

  exports.label = label;
  var button = function button(attrs, children) {
    return _vnode['default']('button', attrs, children);
  };

  exports.button = button;
  var select = function select(attrs, children) {
    return _vnode['default']('select', attrs, children);
  };

  exports.select = select;
  var input = function input(attrs, children) {
    return _vnode['default']('input', attrs, children);
  };

  exports.input = input;
  var textarea = function textarea(attrs, children) {
    return _vnode['default']('textarea', attrs, children);
  };

  exports.textarea = textarea;
  var caption = function caption(attrs, children) {
    return _vnode['default']('caption', attrs, children);
  };

  exports.caption = caption;
  // FORMATTING

  var pre = function pre(attrs, children) {
    return _vnode['default']('pre', attrs, children);
  };

  exports.pre = pre;
  var strong = function strong(attrs, children) {
    return _vnode['default']('strong', attrs, children);
  };

  exports.strong = strong;
  var em = function em(attrs, children) {
    return _vnode['default']('em', attrs, children);
  };
  exports.em = em;
});
define('frampton-dom/ops/apply_attributes', ['exports', 'module', 'frampton-utils/is_nothing', 'frampton-utils/is_object', 'frampton-utils/warn', 'frampton-style/apply_styles', 'frampton-dom/events/utils/is_event', 'frampton-dom/events/event_dispatcher'], function (exports, module, _framptonUtilsIs_nothing, _framptonUtilsIs_object, _framptonUtilsWarn, _framptonStyleApply_styles, _framptonDomEventsUtilsIs_event, _framptonDomEventsEvent_dispatcher) {
  'use strict';

  module.exports = apply_attributes;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isNothing = _interopRequireDefault(_framptonUtilsIs_nothing);

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  var _warn = _interopRequireDefault(_framptonUtilsWarn);

  var _applyStyles = _interopRequireDefault(_framptonStyleApply_styles);

  var _isEvent = _interopRequireDefault(_framptonDomEventsUtilsIs_event);

  /**
   * @name applyAttributes
   * @param {Element} node Dom element to apply attributes to
   * @param {Object} attrs Hash of attributes to apply
   */

  function apply_attributes(node, attrs) {
    for (var _name in attrs) {
      var value = attrs[_name];
      if (_isNothing['default'](value)) {
        if (_isEvent['default'](_name)) {
          _framptonDomEventsEvent_dispatcher.removeEvent(_name, node);
        } else {
          node.removeAttribute(_name);
        }
      } else {
        if (_name === 'style') {
          if (_isObject['default'](value)) {
            _applyStyles['default'](node, value);
          } else {
            _warn['default']('Style attribute is not an object');
          }
        } else if (_isEvent['default'](_name)) {
          _framptonDomEventsEvent_dispatcher.addEvent(_name, node, value);
        } else if (_name !== 'key') {
          node.setAttribute(_name, value);
        }
      }
    }
  }
});
define('frampton-dom/ops/apply_patch', ['exports', 'module', 'frampton-dom/virtual/patch_types', 'frampton-dom/ops/apply_attributes', 'frampton-dom/ops/remove_node', 'frampton-dom/ops/replace_node', 'frampton-dom/ops/insert_node', 'frampton-dom/ops/update_text'], function (exports, module, _framptonDomVirtualPatch_types, _framptonDomOpsApply_attributes, _framptonDomOpsRemove_node, _framptonDomOpsReplace_node, _framptonDomOpsInsert_node, _framptonDomOpsUpdate_text) {
  'use strict';

  module.exports = apply_patch;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _PATCHES = _interopRequireDefault(_framptonDomVirtualPatch_types);

  var _applyAttributes = _interopRequireDefault(_framptonDomOpsApply_attributes);

  var _removeNode = _interopRequireDefault(_framptonDomOpsRemove_node);

  var _replaceNode = _interopRequireDefault(_framptonDomOpsReplace_node);

  var _insertNode = _interopRequireDefault(_framptonDomOpsInsert_node);

  var _updateText = _interopRequireDefault(_framptonDomOpsUpdate_text);

  function executePatch(patch, parentNode, currentNode) {
    var type = patch.type;
    var update = patch.update;
    switch (patch.type) {
      case _PATCHES['default'].NONE:
        break;
      case _PATCHES['default'].INSERT:
        return _insertNode['default'](parentNode, update);
      case _PATCHES['default'].REMOVE:
        return _removeNode['default'](currentNode);
      case _PATCHES['default'].REPLACE:
        return _replaceNode['default'](currentNode, update);
      case _PATCHES['default'].PROPS:
        return _applyAttributes['default'](currentNode, update);
      case _PATCHES['default'].TEXT:
        return _updateText['default'](currentNode, update);
      default:
        throw new Error('Unrecognized patch type: ' + type);
    }
  }

  function nodeAtIndex(node, index) {
    if (node && node.childNodes) {
      return node.childNodes[index] || null;
    } else {
      return null;
    }
  }

  /**
   * @name applyPatch
   * @param {Array} patch
   * @param {Element} parent
   * @param {Element} current
   */

  function apply_patch(patch, parent, current) {
    for (var key in patch) {
      if (key === '_p') {
        executePatch(patch[key], parent, current);
      } else {
        var child = nodeAtIndex(current, key);
        apply_patch(patch[key], current, child);
      }
    }
  }
});
define('frampton-dom/ops/create_element', ['exports', 'module', 'frampton-dom/utils/is_text', 'frampton-dom/ops/apply_attributes'], function (exports, module, _framptonDomUtilsIs_text, _framptonDomOpsApply_attributes) {
  'use strict';

  module.exports = create_element;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isText = _interopRequireDefault(_framptonDomUtilsIs_text);

  var _applyAttributes = _interopRequireDefault(_framptonDomOpsApply_attributes);

  var doc = window.document;

  /*
   * Take a VirtualNode and turns it into real DOM
   *
   * @name createElement
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {VirtualNode}
   * @returns {Element} A new HTML Element
   */

  function create_element(vnode) {

    if (_isText['default'](vnode)) {
      return doc.createTextNode(vnode.text);
    }

    var children = vnode.children;
    var len = children.length;
    var node = doc.createElement(vnode.tagName);
    _applyAttributes['default'](node, vnode.attributes);

    for (var i = 0; i < len; i++) {
      var childNode = create_element(children[i]);
      if (childNode) {
        node.appendChild(childNode);
      }
    }

    return node;
  }
});
define('frampton-dom/ops/insert_node', ['exports', 'module', 'frampton-dom/ops/create_element'], function (exports, module, _framptonDomOpsCreate_element) {
  'use strict';

  module.exports = insert_node;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _createElement = _interopRequireDefault(_framptonDomOpsCreate_element);

  /*
   * @name insertNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} parent
   * @param {VirtualNode} vnode
   */

  function insert_node(parent, vnode) {
    var newNode = _createElement['default'](vnode);
    if (parent) {
      parent.appendChild(newNode);
    }
  }
});
define('frampton-dom/ops/remove_node', ['exports', 'module', 'frampton-dom/events/event_dispatcher'], function (exports, module, _framptonDomEventsEvent_dispatcher) {
  'use strict';

  module.exports = remove_node;

  /*
   * @name removeNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} node
   */

  function remove_node(node) {
    var parent = node.parentNode;
    if (parent) {
      _framptonDomEventsEvent_dispatcher.removeEvents(node);
      parent.removeChild(node);
    }
  }
});
define('frampton-dom/ops/replace_node', ['exports', 'module', 'frampton-dom/ops/create_element', 'frampton-dom/events/event_dispatcher'], function (exports, module, _framptonDomOpsCreate_element, _framptonDomEventsEvent_dispatcher) {
  'use strict';

  module.exports = replace_node;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _createElement = _interopRequireDefault(_framptonDomOpsCreate_element);

  /*
   * @name replaceNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} oldNode Node to replace
   * @param {VirtualNode} vnode VirtualNode representing replacement
   */

  function replace_node(oldNode, vnode) {
    var parent = oldNode.parentNode;
    var newNode = _createElement['default'](vnode);
    if (parent) {
      _framptonDomEventsEvent_dispatcher.removeEvents(oldNode);
      parent.replaceChild(newNode, oldNode);
    }
  }
});
define("frampton-dom/ops/update_text", ["exports", "module"], function (exports, module) {
  /*
   * @name updateText
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} node Node to update
   * @param {String} text New text to display
   */
  "use strict";

  module.exports = update_text;

  function update_text(node, text) {
    node.textContent = text;
  }
});
define('frampton-dom/update', ['exports', 'module', 'frampton-dom/diff', 'frampton-dom/ops/apply_patch'], function (exports, module, _framptonDomDiff, _framptonDomOpsApply_patch) {
  'use strict';

  module.exports = run_update;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff = _interopRequireDefault(_framptonDomDiff);

  var _applyPatch = _interopRequireDefault(_framptonDomOpsApply_patch);

  /**
   * @param {Elemnt} rootNode The element to attach this update
   * @param {Frampton.DOM.VirtualNode} oldTree The old virtual dom
   * @param {Frampton.DOM.VirtualNode} newTree The new virtual dom
   */

  function run_update(rootNode, oldTree, newTree) {
    var patch = _diff['default'](oldTree, newTree);
    _applyPatch['default'](patch, rootNode, rootNode);
  }
});
define('frampton-dom/utils/is_node', ['exports', 'module', 'frampton-utils/is_object'], function (exports, module, _framptonUtilsIs_object) {
  'use strict';

  module.exports = is_text;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  function is_text(node) {
    return _isObject['default'](node) && node.ctor === 'VirtualNode';
  }
});
define('frampton-dom/utils/is_text', ['exports', 'module', 'frampton-utils/is_object'], function (exports, module, _framptonUtilsIs_object) {
  'use strict';

  module.exports = is_text;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  function is_text(node) {
    return _isObject['default'](node) && node.ctor === 'VirtualText';
  }
});
define('frampton-dom/utils/object_diff', ['exports', 'module', 'frampton-utils/is_object'], function (exports, module, _framptonUtilsIs_object) {
  'use strict';

  module.exports = object_diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  function object_diff(oldObj, newObj) {

    var diff;

    for (var key in oldObj) {

      var oldValue = oldObj[key];
      var newValue = newObj[key];

      if (!newValue) {
        diff = diff || {};
        diff[key] = undefined;
      }

      if (_isObject['default'](oldValue) && _isObject['default'](newValue)) {
        var tempDiff = object_diff(oldValue, newValue);
        if (tempDiff) {
          diff = diff || {};
          diff[key] = object_diff(oldValue, newValue);
        }
      } else if (oldValue !== newValue) {
        diff = diff || {};
        diff[key] = newValue;
      }
    }

    for (var key in newObj) {
      if (!oldObj[key]) {
        diff = diff || {};
        diff[key] = newObj[key];
      }
    }

    return diff;
  }
});
define('frampton-dom/virtual/node', ['exports', 'module', 'frampton-list/length', 'frampton-utils/is_array', 'frampton-utils/is_object', 'frampton-utils/is_string'], function (exports, module, _framptonListLength, _framptonUtilsIs_array, _framptonUtilsIs_object, _framptonUtilsIs_string) {
  'use strict';

  module.exports = VirtualNode;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _length = _interopRequireDefault(_framptonListLength);

  var _isArray = _interopRequireDefault(_framptonUtilsIs_array);

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  var _isString = _interopRequireDefault(_framptonUtilsIs_string);

  var noChildren = [];
  var noAttributes = {};

  /**
   * @name VirtualNode
   * @memberof Frampton.DOM
   * @class
   * @private
   * @param {String} name Tag name for new node
   * @param {Object} attrs Attributes to apply to new node
   * @param {Array} children List of child nodes
   * @returns {VirtualNode} A new VirtualNode
   */

  function VirtualNode(name, attrs, children) {

    if (!_isString['default'](name)) {
      throw new Error('VirtualNode must have a string name');
    }

    if (_isArray['default'](attrs)) {
      children = attrs;
    }

    attrs = _isObject['default'](attrs) ? attrs : noAttributes;
    children = _isArray['default'](children) ? children : noChildren;

    return {
      ctor: 'VirtualNode',
      tagName: name,
      attributes: attrs,
      children: children,
      length: _length['default'](children)
    };
  }
});
define("frampton-dom/virtual/patch_types", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    NONE: 0,
    INSERT: 1,
    REMOVE: 2,
    REPLACE: 3,
    PROPS: 4,
    REORDER: 5,
    TEXT: 6
  };
});
define('frampton-dom/virtual/patch', ['exports', 'frampton-dom/virtual/patch_types'], function (exports, _framptonDomVirtualPatch_types) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _TYPES = _interopRequireDefault(_framptonDomVirtualPatch_types);

  /**
   * @name VirtualPatch
   * @memberof Frampton.DOM
   * @class
   * @private
   * @param {Number} type Type of patch
   * @param {VirtualNode} node VirtualNode to patch
   * @param {*} update Description of update to make
   * @returns {VirtualPatch} A new VirtualPatch
   */
  function VirtualPatch(type, node, update) {
    return {
      ctor: 'VirtualPatch',
      type: type,
      node: node,
      update: update
    };
  }

  var none = function none(node, patch) {
    return VirtualPatch(_TYPES['default'].NONE, node, patch);
  };

  exports.none = none;
  var insert = function insert(node, patch) {
    return VirtualPatch(_TYPES['default'].INSERT, node, patch);
  };

  exports.insert = insert;
  var remove = function remove(node, patch) {
    return VirtualPatch(_TYPES['default'].REMOVE, node, patch);
  };

  exports.remove = remove;
  var replace = function replace(node, patch) {
    return VirtualPatch(_TYPES['default'].REPLACE, node, patch);
  };

  exports.replace = replace;
  var props = function props(node, patch) {
    return VirtualPatch(_TYPES['default'].PROPS, node, patch);
  };

  exports.props = props;
  var text = function text(node, patch) {
    return VirtualPatch(_TYPES['default'].TEXT, node, patch);
  };
  exports.text = text;
});
define('frampton-dom/virtual/text', ['exports', 'module'], function (exports, module) {
  /**
   * @name VirtualText
   * @memberof Frampton.DOM
   * @class
   * @private
   * @param {String} str Text content for new text node
   * @returns {VirtualText} A new VirtualText
   */
  'use strict';

  module.exports = VirtualText;

  function VirtualText(str) {
    return {
      ctor: 'VirtualText',
      text: str
    };
  }
});
require("frampton-dom");

})();