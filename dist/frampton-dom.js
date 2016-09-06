(function() {
/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  }

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

}());

define('frampton-dom', ['frampton/namespace', 'frampton-dom/diff', 'frampton-dom/update', 'frampton-dom/scene', 'frampton-dom/html/dom'], function (_namespace, _diff, _update, _scene, _dom) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _diff2 = _interopRequireDefault(_diff);

  var _update2 = _interopRequireDefault(_update);

  var _scene2 = _interopRequireDefault(_scene);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name DOM
   * @namespace
   * @memberof Frampton
   */
  _namespace2.default.DOM = {};
  _namespace2.default.DOM.VERSION = '0.1.1';
  _namespace2.default.DOM.diff = _diff2.default;
  _namespace2.default.DOM.update = _update2.default;
  _namespace2.default.DOM.scene = _scene2.default;

  /**
   * @name Html
   * @namespace
   * @memberof Frampton.DOM
   */
  _namespace2.default.DOM.Html = {};
  // PRIMITIVES
  _namespace2.default.DOM.Html.node = _dom.node;
  _namespace2.default.DOM.Html.text = _dom.text;
  // BASICS
  _namespace2.default.DOM.Html.div = _dom.div;
  _namespace2.default.DOM.Html.span = _dom.span;
  _namespace2.default.DOM.Html.p = _dom.p;
  _namespace2.default.DOM.Html.a = _dom.a;
  // SEMANTIC
  _namespace2.default.DOM.Html.header = _dom.header;
  _namespace2.default.DOM.Html.footer = _dom.footer;
  _namespace2.default.DOM.Html.article = _dom.article;
  _namespace2.default.DOM.Html.section = _dom.section;
  _namespace2.default.DOM.Html.aside = _dom.aside;
  _namespace2.default.DOM.Html.main = _dom.main;
  _namespace2.default.DOM.Html.nav = _dom.nav;
  _namespace2.default.DOM.Html.menu = _dom.menu;
  _namespace2.default.DOM.Html.menuitem = _dom.menuitem;
  _namespace2.default.DOM.Html.address = _dom.address;
  _namespace2.default.DOM.Html.summary = _dom.summary;
  _namespace2.default.DOM.Html.details = _dom.details;
  _namespace2.default.DOM.Html.progress = _dom.progress;
  // LISTS
  _namespace2.default.DOM.Html.ul = _dom.ul;
  _namespace2.default.DOM.Html.ol = _dom.ol;
  _namespace2.default.DOM.Html.li = _dom.li;
  // DESCRIPTION LISTS
  _namespace2.default.DOM.Html.dl = _dom.dl;
  _namespace2.default.DOM.Html.dt = _dom.dt;
  _namespace2.default.DOM.Html.dd = _dom.dd;
  // HEADINGS
  _namespace2.default.DOM.Html.h1 = _dom.h1;
  _namespace2.default.DOM.Html.h2 = _dom.h2;
  _namespace2.default.DOM.Html.h3 = _dom.h3;
  _namespace2.default.DOM.Html.h4 = _dom.h4;
  _namespace2.default.DOM.Html.h5 = _dom.h5;
  _namespace2.default.DOM.Html.h6 = _dom.h6;
  // FORMATTING
  _namespace2.default.DOM.Html.strong = _dom.strong;
  _namespace2.default.DOM.Html.em = _dom.em;
  _namespace2.default.DOM.Html.pre = _dom.pre;
  _namespace2.default.DOM.Html.code = _dom.code;
  // FORMS
  _namespace2.default.DOM.Html.form = _dom.form;
  _namespace2.default.DOM.Html.legend = _dom.legend;
  _namespace2.default.DOM.Html.fieldset = _dom.fieldset;
  _namespace2.default.DOM.Html.input = _dom.input;
  _namespace2.default.DOM.Html.label = _dom.label;
  _namespace2.default.DOM.Html.button = _dom.button;
  _namespace2.default.DOM.Html.textarea = _dom.textarea;
  _namespace2.default.DOM.Html.option = _dom.option;
  _namespace2.default.DOM.Html.optgroup = _dom.optgroup;
  _namespace2.default.DOM.Html.select = _dom.select;
  // MEDIA
  _namespace2.default.DOM.Html.figure = _dom.figure;
  _namespace2.default.DOM.Html.img = _dom.img;
  _namespace2.default.DOM.Html.video = _dom.video;
  _namespace2.default.DOM.Html.audio = _dom.audio;
  _namespace2.default.DOM.Html.source = _dom.source;
  _namespace2.default.DOM.Html.figcaption = _dom.figcaption;
  // TABLES
  _namespace2.default.DOM.Html.table = _dom.table;
  _namespace2.default.DOM.Html.thead = _dom.thead;
  _namespace2.default.DOM.Html.tbody = _dom.tbody;
  _namespace2.default.DOM.Html.tfoot = _dom.tfoot;
  _namespace2.default.DOM.Html.tr = _dom.tr;
  _namespace2.default.DOM.Html.td = _dom.td;
  _namespace2.default.DOM.Html.col = _dom.col;
  _namespace2.default.DOM.Html.colgroup = _dom.colgroup;
  _namespace2.default.DOM.Html.caption = _dom.caption;
});
define('frampton-dom/diff', ['exports', 'frampton-utils/is_defined', 'frampton-utils/is_undefined', 'frampton-utils/is_something', 'frampton-utils/warn', 'frampton-math/max', 'frampton-dom/virtual/patch', 'frampton-dom/utils/is_node', 'frampton-dom/utils/is_text', 'frampton-dom/utils/props_diff', 'frampton-dom/utils/is_same_node'], function (exports, _is_defined, _is_undefined, _is_something, _warn, _max, _patch, _is_node, _is_text, _props_diff, _is_same_node) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = diff;

  var _is_defined2 = _interopRequireDefault(_is_defined);

  var _is_undefined2 = _interopRequireDefault(_is_undefined);

  var _is_something2 = _interopRequireDefault(_is_something);

  var _warn2 = _interopRequireDefault(_warn);

  var _max2 = _interopRequireDefault(_max);

  var _is_node2 = _interopRequireDefault(_is_node);

  var _is_text2 = _interopRequireDefault(_is_text);

  var _props_diff2 = _interopRequireDefault(_props_diff);

  var _is_same_node2 = _interopRequireDefault(_is_same_node);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function indexesMatch(oldIndex, newIndex) {
    return (0, _is_defined2.default)(oldIndex) && (0, _is_defined2.default)(newIndex) && oldIndex === newIndex;
  }

  function diffTrees(oldTree, newTree) {
    var patch, newPatch;

    // Same reference, no need to do anything
    if (oldTree === newTree) {
      return;

      // New tree is a valid node
    } else if ((0, _is_node2.default)(newTree)) {
      if ((0, _is_node2.default)(oldTree)) {
        if ((0, _is_same_node2.default)(oldTree, newTree)) {
          var pDiff = (0, _props_diff2.default)(oldTree, newTree);
          if ((0, _is_something2.default)(pDiff)) {
            newPatch = (0, _patch.props)(null, pDiff);
          }
          patch = diffChildren(oldTree, newTree);
        } else {
          newPatch = (0, _patch.replace)(oldTree, newTree);
        }
      } else {
        newPatch = (0, _patch.insert)(null, newTree);
      }

      // Ooops, tree isn't a valid node
    } else {
      throw new Error('Root of DOM should be a VirtualNode');
    }

    if (newPatch) {
      patch = patch || [];
      patch._p = newPatch;
    }

    return patch;
  }

  function diffChildren(oldNode, newNode) {

    // Same reference
    if (oldNode === newNode) {
      return;
    }

    var oldChildren = oldNode.children;
    var newChildren = newNode.children;
    var newLength = newChildren.length;
    var oldLength = oldChildren.length;
    var len = (0, _max2.default)(oldLength, newLength);
    var orderMap = [];
    var inserts = [];
    var newKeys = {};
    var oldKeys = {};
    var dirty = false;
    var parentPatch = void 0;

    // Create a map of keys to their new index O(n)
    for (var i = 0; i < newLength; i++) {
      var child = newChildren[i];
      if ((0, _is_node2.default)(child)) {
        var key = child.key;
        if (key) {
          newKeys[key] = i;
        }
      }
    }

    // Create a map of keys to their old index O(n)
    for (var _i = 0; _i < oldLength; _i++) {
      var _child = oldChildren[_i];
      if ((0, _is_node2.default)(_child)) {
        var _key = _child.key;
        if (_key) {
          oldKeys[_key] = _i;
        }
      }
    }

    // O(n)
    for (var _i2 = 0; _i2 < len; _i2++) {
      var oldChild = oldChildren[_i2];
      var newChild = newChildren[_i2];
      var newIndex = void 0;
      var oldIndex = void 0;
      var newPatch = void 0;
      var patch = void 0;

      // We have a new node
      if ((0, _is_node2.default)(newChild)) {

        // Index of new node in previous DOM
        oldIndex = oldKeys[newChild.key];

        // We have an old node
        if ((0, _is_node2.default)(oldChild)) {

          // Index of old node in new DOM
          newIndex = newKeys[oldChild.key];

          // If old and new are the same, no changes
          if (indexesMatch(oldIndex, newIndex)) {
            orderMap[_i2] = _i2;
            var pDiff = (0, _props_diff2.default)(oldChild, newChild);
            if ((0, _is_something2.default)(pDiff)) {
              newPatch = (0, _patch.props)(null, pDiff);
            }
            patch = diffChildren(oldChild, newChild);
          } else {

            // Old node has no new index, delete it
            if ((0, _is_undefined2.default)(newIndex)) {
              dirty = true;
              if (oldChild.attributes.transitionOut) {
                orderMap[_i2] = (0, _patch.remove)(null, oldChild.attributes.transitionOut);
              } else {
                orderMap[_i2] = undefined;
              }

              // The index changed, we have a move
            } else if (newIndex !== _i2) {
              dirty = true;
              orderMap[_i2] = newIndex;
              var _pDiff = (0, _props_diff2.default)(oldChild, newChildren[newIndex]);
              if ((0, _is_something2.default)(_pDiff)) {
                newPatch = (0, _patch.props)(null, _pDiff);
              }
              patch = diffChildren(oldChild, newChildren[newIndex]);
            }

            // The new node is an insert
            if ((0, _is_undefined2.default)(oldIndex)) {
              inserts[_i2] = (0, _patch.insert)(null, newChild);
            }
          }

          // We have no old node, or it is text
        } else if ((0, _is_undefined2.default)(oldIndex)) {
          dirty = true;
          orderMap[_i2] = undefined;
          inserts[_i2] = (0, _patch.insert)(null, newChild);
        }

        // New node is text
      } else if ((0, _is_text2.default)(newChild)) {

        // Old node was text
        if ((0, _is_text2.default)(oldChild)) {

          // Both nodes are text, index is the same
          orderMap[_i2] = _i2;

          // Text nodes are the same if they have same text, duh.
          if (oldChild.text !== newChild.text) {
            newPatch = (0, _patch.text)(oldChild, newChild.text);
          }

          // Old node was a node
        } else if ((0, _is_node2.default)(oldChild)) {
          dirty = true;
          newIndex = newKeys[oldChild.key];

          // Old node was deleted
          if ((0, _is_undefined2.default)(newIndex)) {
            if (oldChild.attributes.transitionOut) {
              orderMap[_i2] = (0, _patch.remove)(null, oldChild.attributes.transitionOut);
            } else {
              orderMap[_i2] = undefined;
            }

            // Old node was moved
          } else if (newIndex !== _i2) {
            orderMap[_i2] = newIndex;
            var _pDiff2 = (0, _props_diff2.default)(oldChild, newChildren[newIndex]);
            if ((0, _is_something2.default)(_pDiff2)) {
              newPatch = (0, _patch.props)(null, _pDiff2);
            }
            patch = diffChildren(oldChild, newChildren[newIndex]);

            // Shouldn't happen
          } else {
            (0, _warn2.default)('Should not get here, new node is text');
          }

          inserts[_i2] = (0, _patch.insert)(null, newChild);

          // No old node, straight insert
        } else {
          inserts[_i2] = (0, _patch.insert)(null, newChild);
        }

        // If there is no new node here, index is vacant
      } else {

        // This is going to be dirty somehow
        dirty = true;

        if ((0, _is_defined2.default)(newKeys)) {
          // Index of old node in new DOM
          newIndex = newKeys[oldChild.key];

          if ((0, _is_defined2.default)(newIndex)) {
            dirty = true;
            orderMap[_i2] = newIndex;
            var _pDiff3 = (0, _props_diff2.default)(oldChild, newChildren[newIndex]);
            if ((0, _is_something2.default)(_pDiff3)) {
              newPatch = (0, _patch.props)(null, _pDiff3);
            }
            patch = diffChildren(oldChild, newChildren[newIndex]);
          } else {
            if (oldChild.attributes.transitionOut) {
              orderMap[_i2] = (0, _patch.remove)(null, oldChild.attributes.transitionOut);
            } else {
              orderMap[_i2] = undefined;
            }
          }
        } else {
          if (oldChild.attributes.transitionOut) {
            orderMap[_i2] = (0, _patch.remove)(null, oldChild.attributes.transitionOut);
          } else {
            orderMap[_i2] = undefined;
          }
        }
      }

      if (newPatch) {
        patch = patch || [];
        patch._p = newPatch;
      }

      if (patch) {
        parentPatch = parentPatch || [];
        parentPatch[_i2] = patch;
      }
    }

    if (dirty) {
      parentPatch = parentPatch || [];
      parentPatch._o = (0, _patch.reorder)(null, orderMap);
    }

    if (inserts.length > 0) {
      parentPatch = parentPatch || [];
      parentPatch._i = inserts;
    }

    return parentPatch;
  }

  /**
   * @name diff
   * @param {Frampton.DOM.VirtualNode} oldTree The old virtual tree
   * @param {Frampton.DOM.VirtualNode} newTree The virtual tree to diff against
   * @param {Array} patch
   */
  function diff(oldTree, newTree) {
    var patch = diffTrees(oldTree, newTree) || [];
    return [patch];
  }
});
define('frampton-dom/events/add_event', ['exports', 'frampton-utils/immediate', 'frampton-dom/events/event_map', 'frampton-dom/events/utils/node_gate', 'frampton-dom/events/utils/make_handler'], function (exports, _immediate, _event_map, _node_gate, _make_handler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = add_event;

  var _immediate2 = _interopRequireDefault(_immediate);

  var _event_map2 = _interopRequireDefault(_event_map);

  var _node_gate2 = _interopRequireDefault(_node_gate);

  var _make_handler2 = _interopRequireDefault(_make_handler);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name addEvent
   * @method
   * @memberof Frampton.DOM.events
   * @private
   * @param {String} name
   * @param {Element} node
   * @param {Function} handler
   */
  function add_event(name, node, messages, decorator) {
    name = _event_map2.default[name] || name;
    (0, _immediate2.default)(function () {

      var handler = (0, _make_handler2.default)(messages, decorator);

      // Transitionend events will not be fired for child nodes. The event must occur on this node.
      if (name === 'transitionend') {
        handler = (0, _node_gate2.default)(node, handler);
      }

      node['on' + name] = handler;
    });
  }
});
define('frampton-dom/events/event_map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
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
define('frampton-dom/events/remove_event', ['exports', 'frampton-utils/immediate', 'frampton-dom/events/event_map'], function (exports, _immediate, _event_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = remove_event;

  var _immediate2 = _interopRequireDefault(_immediate);

  var _event_map2 = _interopRequireDefault(_event_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name removeEvent
   * @method
   * @memberof Frampton.DOM.events
   * @private
   * @param {String} name
   * @param {Element} node
   */
  function remove_event(name, node) {
    name = _event_map2.default[name] || name;
    (0, _immediate2.default)(function () {
      node['on' + name] = null;
    });
  }
});
define('frampton-dom/events/utils/is_event', ['exports', 'frampton-utils/is_something', 'frampton-dom/events/event_map'], function (exports, _is_something, _event_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_event;

  var _is_something2 = _interopRequireDefault(_is_something);

  var _event_map2 = _interopRequireDefault(_event_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function is_event(name) {
    return (0, _is_something2.default)(_event_map2.default[name]);
  }
});
define("frampton-dom/events/utils/make_handler", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = make_handler;
  function make_handler(messages, decorator) {
    return function (evt) {
      messages(decorator(evt));
    };
  }
});
define("frampton-dom/events/utils/node_gate", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = node_gate;
  /**
   *  Only allow an event through if it's target is the given node
   */
  function node_gate(node, fn) {
    return function (evt) {
      if (evt.target === node) {
        return fn(evt);
      }
    };
  }
});
define('frampton-dom/html/dom', ['exports', 'frampton-utils/is_array', 'frampton-utils/warn', 'frampton-dom/virtual/node', 'frampton-dom/virtual/text'], function (exports, _is_array, _warn, _node, _text) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.td = exports.tr = exports.th = exports.colgroup = exports.col = exports.tfoot = exports.thead = exports.tbody = exports.caption = exports.table = exports.em = exports.strong = exports.code = exports.pre = exports.textarea = exports.input = exports.select = exports.button = exports.label = exports.optgroup = exports.option = exports.fieldset = exports.legend = exports.form = exports.figcaption = exports.figure = exports.source = exports.audio = exports.video = exports.img = exports.dd = exports.dt = exports.dl = exports.li = exports.ol = exports.ul = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.progress = exports.details = exports.summary = exports.address = exports.menuitem = exports.menu = exports.nav = exports.main = exports.aside = exports.section = exports.article = exports.footer = exports.header = exports.a = exports.p = exports.span = exports.div = exports.text = exports.node = undefined;

  var _is_array2 = _interopRequireDefault(_is_array);

  var _warn2 = _interopRequireDefault(_warn);

  var _node2 = _interopRequireDefault(_node);

  var _text2 = _interopRequireDefault(_text);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // GENERIC DOM NODE

  var node = exports.node = function node(name, attrs, children) {
    return (0, _node2.default)(name, attrs, children);
  };

  // TEXT NODE

  var text = exports.text = function text(value) {
    return (0, _text2.default)(value);
  };

  // BASIC TAGS

  var div = exports.div = function div(attrs, children) {
    return (0, _node2.default)('div', attrs, children);
  };

  var span = exports.span = function span(attrs, children) {
    return (0, _node2.default)('span', attrs, children);
  };

  var p = exports.p = function p(attrs, children) {
    return (0, _node2.default)('p', attrs, children);
  };

  var a = exports.a = function a(attrs, children) {
    return (0, _node2.default)('a', attrs, children);
  };

  // SEMANTIC

  var header = exports.header = function header(attrs, children) {
    return (0, _node2.default)('header', attrs, children);
  };

  var footer = exports.footer = function footer(attrs, children) {
    return (0, _node2.default)('footer', attrs, children);
  };

  var article = exports.article = function article(attrs, children) {
    return (0, _node2.default)('article', attrs, children);
  };

  var section = exports.section = function section(attrs, children) {
    return (0, _node2.default)('section', attrs, children);
  };

  var aside = exports.aside = function aside(attrs, children) {
    return (0, _node2.default)('aside', attrs, children);
  };

  var main = exports.main = function main(attrs, children) {
    return (0, _node2.default)('main', attrs, children);
  };

  var nav = exports.nav = function nav(attrs, children) {
    return (0, _node2.default)('nav', attrs, children);
  };

  var menu = exports.menu = function menu(attrs, children) {
    return (0, _node2.default)('menu', attrs, children);
  };

  var menuitem = exports.menuitem = function menuitem(attrs, children) {
    return (0, _node2.default)('menuitem', attrs, children);
  };

  var address = exports.address = function address(attrs, children) {
    return (0, _node2.default)('address', attrs, children);
  };

  var summary = exports.summary = function summary(attrs, children) {
    return (0, _node2.default)('summary', attrs, children);
  };

  var details = exports.details = function details(attrs, children) {
    return (0, _node2.default)('details', attrs, children);
  };

  var progress = exports.progress = function progress(attrs, children) {
    return (0, _node2.default)('progress', attrs, children);
  };

  // HEADINGS

  var h1 = exports.h1 = function h1(attrs, children) {
    return (0, _node2.default)('h1', attrs, children);
  };

  var h2 = exports.h2 = function h2(attrs, children) {
    return (0, _node2.default)('h2', attrs, children);
  };

  var h3 = exports.h3 = function h3(attrs, children) {
    return (0, _node2.default)('h3', attrs, children);
  };

  var h4 = exports.h4 = function h4(attrs, children) {
    return (0, _node2.default)('h4', attrs, children);
  };

  var h5 = exports.h5 = function h5(attrs, children) {
    return (0, _node2.default)('h5', attrs, children);
  };

  var h6 = exports.h6 = function h6(attrs, children) {
    return (0, _node2.default)('h6', attrs, children);
  };

  // LISTS

  var ul = exports.ul = function ul(attrs, children) {
    return (0, _node2.default)('ul', attrs, children);
  };

  var ol = exports.ol = function ol(attrs, children) {
    return (0, _node2.default)('ol', attrs, children);
  };

  var li = exports.li = function li(attrs, children) {
    return (0, _node2.default)('li', attrs, children);
  };

  // DESCRIPTION LISTS

  var dl = exports.dl = function dl(attrs, children) {
    return (0, _node2.default)('dl', attrs, children);
  };

  var dt = exports.dt = function dt(attrs, children) {
    return (0, _node2.default)('dt', attrs, children);
  };

  var dd = exports.dd = function dd(attrs, children) {
    return (0, _node2.default)('dd', attrs, children);
  };

  // MEDIA

  var img = exports.img = function img(attrs, children) {
    if ((0, _is_array2.default)(children) && children.length > 0) {
      (0, _warn2.default)('Html img tag does not support children');
    }
    return (0, _node2.default)('img', attrs, []);
  };

  var video = exports.video = function video(attrs, children) {
    return (0, _node2.default)('video', attrs, children);
  };

  var audio = exports.audio = function audio(attrs, children) {
    return (0, _node2.default)('audio', attrs, children);
  };

  var source = exports.source = function source(attrs, children) {
    return (0, _node2.default)('source', attrs, children);
  };

  var figure = exports.figure = function figure(attrs, children) {
    return (0, _node2.default)('figure', attrs, children);
  };

  var figcaption = exports.figcaption = function figcaption(attrs, children) {
    return (0, _node2.default)('figcaption', attrs, children);
  };

  // FORMS

  var form = exports.form = function form(attrs, children) {
    return (0, _node2.default)('form', attrs, children);
  };

  var legend = exports.legend = function legend(attrs, children) {
    return (0, _node2.default)('legend', attrs, children);
  };

  var fieldset = exports.fieldset = function fieldset(attrs, children) {
    return (0, _node2.default)('fieldset', attrs, children);
  };

  var option = exports.option = function option(attrs, children) {
    return (0, _node2.default)('option', attrs, children);
  };

  var optgroup = exports.optgroup = function optgroup(attrs, children) {
    return (0, _node2.default)('optgroup', attrs, children);
  };

  var label = exports.label = function label(attrs, children) {
    return (0, _node2.default)('label', attrs, children);
  };

  var button = exports.button = function button(attrs, children) {
    return (0, _node2.default)('button', attrs, children);
  };

  var select = exports.select = function select(attrs, children) {
    return (0, _node2.default)('select', attrs, children);
  };

  var input = exports.input = function input(attrs, children) {
    if ((0, _is_array2.default)(children) && children.length > 0) {
      (0, _warn2.default)('Html input tag does not support children');
    }
    return (0, _node2.default)('input', attrs, children);
  };

  var textarea = exports.textarea = function textarea(attrs, children) {
    return (0, _node2.default)('textarea', attrs, children);
  };

  // FORMATTING

  var pre = exports.pre = function pre(attrs, children) {
    return (0, _node2.default)('pre', attrs, children);
  };

  var code = exports.code = function code(attrs, children) {
    return (0, _node2.default)('code', attrs, children);
  };

  var strong = exports.strong = function strong(attrs, children) {
    return (0, _node2.default)('strong', attrs, children);
  };

  var em = exports.em = function em(attrs, children) {
    return (0, _node2.default)('em', attrs, children);
  };

  // TABLES

  var table = exports.table = function table(attrs, children) {
    return (0, _node2.default)('table', attrs, children);
  };

  var caption = exports.caption = function caption(attrs, children) {
    return (0, _node2.default)('caption', attrs, children);
  };

  var tbody = exports.tbody = function tbody(attrs, children) {
    return (0, _node2.default)('tbody', attrs, children);
  };

  var thead = exports.thead = function thead(attrs, children) {
    return (0, _node2.default)('thead', attrs, children);
  };

  var tfoot = exports.tfoot = function tfoot(attrs, children) {
    return (0, _node2.default)('tfoot', attrs, children);
  };

  var col = exports.col = function col(attrs, children) {
    return (0, _node2.default)('col', attrs, children);
  };

  var colgroup = exports.colgroup = function colgroup(attrs, children) {
    return (0, _node2.default)('colgroup', attrs, children);
  };

  var th = exports.th = function th(attrs, children) {
    return (0, _node2.default)('th', attrs, children);
  };

  var tr = exports.tr = function tr(attrs, children) {
    return (0, _node2.default)('tr', attrs, children);
  };

  var td = exports.td = function td(attrs, children) {
    return (0, _node2.default)('td', attrs, children);
  };
});
define('frampton-dom/ops/apply_attributes', ['exports', 'frampton-utils/is_nothing', 'frampton-utils/is_object', 'frampton-utils/warn', 'frampton-list/contains', 'frampton-style/apply_styles', 'frampton-dom/ops/apply_classes', 'frampton-dom/utils/validated_class', 'frampton-dom/utils/validated_transition', 'frampton-dom/ops/apply_transition', 'frampton-dom/events/utils/is_event', 'frampton-dom/events/add_event', 'frampton-dom/events/remove_event'], function (exports, _is_nothing, _is_object, _warn, _contains, _apply_styles, _apply_classes, _validated_class, _validated_transition, _apply_transition, _is_event, _add_event, _remove_event) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_attributes;

  var _is_nothing2 = _interopRequireDefault(_is_nothing);

  var _is_object2 = _interopRequireDefault(_is_object);

  var _warn2 = _interopRequireDefault(_warn);

  var _contains2 = _interopRequireDefault(_contains);

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _apply_classes2 = _interopRequireDefault(_apply_classes);

  var _validated_class2 = _interopRequireDefault(_validated_class);

  var _validated_transition2 = _interopRequireDefault(_validated_transition);

  var _apply_transition2 = _interopRequireDefault(_apply_transition);

  var _is_event2 = _interopRequireDefault(_is_event);

  var _add_event2 = _interopRequireDefault(_add_event);

  var _remove_event2 = _interopRequireDefault(_remove_event);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Properties to not add to DOM node
  var blacklist = ['key', 'transitionIn', 'transitionOut'];

  /**
   * @name applyAttributes
   * @param {Element} node Dom element to apply attributes to
   * @param {Object} attrs Hash of attributes to apply
   * @param {Functon} messages Function to handle events
   */
  function apply_attributes(node, attrs, messages) {

    for (var name in attrs) {
      var value = attrs[name];
      if ((0, _is_nothing2.default)(value) || value === false) {
        if ((0, _is_event2.default)(name)) {
          (0, _remove_event2.default)(name, node);
        } else {

          if (name === 'focus') {
            node.removeAttribute('data-fr-dom-focus');
          } else if (name === 'html') {
            node.innerHTML = '';
          } else {
            node.removeAttribute(name);
          }
        }
      } else {

        if (name === 'style') {
          if ((0, _is_object2.default)(value)) {
            (0, _apply_styles2.default)(node, value);
          } else {
            (0, _warn2.default)('Style attribute is not an object');
          }
        } else if (name === 'transition') {
          (0, _apply_transition2.default)(node, (0, _validated_transition2.default)(value));
        } else if (name === 'class') {
          (0, _apply_classes2.default)(node, (0, _validated_class2.default)(value));
        } else if (name === 'focus') {
          node.setAttribute('data-fr-dom-focus', value);
        } else if (name === 'html') {
          node.innerHTML = value;
        } else if ((0, _is_event2.default)(name)) {
          (0, _add_event2.default)(name, node, messages, value);
        } else if (!(0, _contains2.default)(blacklist, name)) {
          node.setAttribute(name, value);
        }
      }
    }
  }
});
define("frampton-dom/ops/apply_classes", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_classes;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function apply_classes(node, diff) {
    if (diff.remove && diff.remove.length > 0) {
      var _node$classList;

      (_node$classList = node.classList).remove.apply(_node$classList, _toConsumableArray(diff.remove));
    }

    if (diff.add && diff.add.length > 0) {
      var _node$classList2;

      (_node$classList2 = node.classList).add.apply(_node$classList2, _toConsumableArray(diff.add));
    }
  }
});
define('frampton-dom/ops/apply_globals', ['exports', 'frampton-utils/is_something'], function (exports, _is_something) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_globals;

  var _is_something2 = _interopRequireDefault(_is_something);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * We would like to apply some attributes after the DOM is constructed,
   * such as focus.
   */
  function apply_globals(root) {
    var focused = root.querySelector('[data-fr-dom-focus="true"]');
    if ((0, _is_something2.default)(focused) && focused.nodeType === 1) {
      focused.focus();
    }
  }
});
define('frampton-dom/ops/apply_patch', ['exports', 'frampton-utils/is_numeric', 'frampton-dom/utils/node_at_index', 'frampton-dom/ops/execute_patch', 'frampton-dom/ops/perform_inserts', 'frampton-dom/ops/reset_child_state'], function (exports, _is_numeric, _node_at_index, _execute_patch, _perform_inserts, _reset_child_state) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_patch;

  var _is_numeric2 = _interopRequireDefault(_is_numeric);

  var _node_at_index2 = _interopRequireDefault(_node_at_index);

  var _execute_patch2 = _interopRequireDefault(_execute_patch);

  var _perform_inserts2 = _interopRequireDefault(_perform_inserts);

  var _reset_child_state2 = _interopRequireDefault(_reset_child_state);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name applyPatch
   * @param {Array} patch
   * @param {Element} parent
   * @param {Element} current
   */
  function apply_patch(patch, messages, parent, current) {

    (0, _reset_child_state2.default)(current);

    // Apply patches to child nodes
    for (var key in patch) {
      if ((0, _is_numeric2.default)(key)) {
        var child = (0, _node_at_index2.default)(current, key);
        apply_patch(patch[key], messages, current, child);
      }
    }

    // Reorder child nodes
    if (patch._o) {
      (0, _execute_patch2.default)(patch._o, messages, parent, current);
    }

    // Insert new nodes
    if (patch._i) {
      (0, _perform_inserts2.default)(current, patch._i, messages);
    }

    // Patch props and text
    if (patch._p) {
      (0, _execute_patch2.default)(patch._p, messages, parent, current);
    }
  }
});
define('frampton-dom/ops/apply_styles', ['exports', 'frampton-style/set_style'], function (exports, _set_style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_styles;

  var _set_style2 = _interopRequireDefault(_set_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function apply_styles(node, props) {
    for (var key in props) {
      var value = props[key];
      if (key === 'height' && value === 'auto') {} else if (key === 'width' && value === 'auto') {} else {
        (0, _set_style2.default)(node, key, value);
      }
    }
  }
});
define('frampton-dom/ops/apply_transition', ['exports', 'frampton-style/apply_styles', 'frampton-dom/utils/reflow', 'frampton-dom/utils/normalized_frame', 'frampton-utils/immediate', 'frampton-dom/ops/apply_classes', 'frampton-dom/utils/validated_class'], function (exports, _apply_styles, _reflow, _normalized_frame, _immediate, _apply_classes, _validated_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_transition;

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _reflow2 = _interopRequireDefault(_reflow);

  var _normalized_frame2 = _interopRequireDefault(_normalized_frame);

  var _immediate2 = _interopRequireDefault(_immediate);

  var _apply_classes2 = _interopRequireDefault(_apply_classes);

  var _validated_class2 = _interopRequireDefault(_validated_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name applyTransition
   * @param {Element} node Dom element to apply transition to
   * @param {Object} desc An object describing the transition to make
   */
  function apply_transition(node, desc) {

    var startClasses = (0, _validated_class2.default)(desc.from.class);
    var startFrame = (0, _normalized_frame2.default)(desc.from.style);
    (0, _apply_classes2.default)(node, startClasses);
    (0, _apply_styles2.default)(node, startFrame);

    (0, _immediate2.default)(function () {
      var endClasses = (0, _validated_class2.default)(desc.to.class);
      var endFrame = (0, _normalized_frame2.default)(desc.to.style);
      // Force a reflow to make sure we're in a good state
      (0, _reflow2.default)(node);
      (0, _apply_classes2.default)(node, endClasses);
      (0, _apply_styles2.default)(node, endFrame);
    });
  }
});
define('frampton-dom/ops/create_element', ['exports', 'frampton-dom/utils/is_text', 'frampton-dom/ops/apply_attributes'], function (exports, _is_text, _apply_attributes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = create_element;

  var _is_text2 = _interopRequireDefault(_is_text);

  var _apply_attributes2 = _interopRequireDefault(_apply_attributes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
  function create_element(vnode, messages) {

    if ((0, _is_text2.default)(vnode)) {
      return doc.createTextNode(vnode.text);
    }

    var children = vnode.children;
    var len = children.length;
    var node = doc.createElement(vnode.tagName);
    (0, _apply_attributes2.default)(node, vnode.attributes, messages);

    for (var i = 0; i < len; i++) {
      var childNode = create_element(children[i], messages);
      if (childNode) {
        node.appendChild(childNode);
      }
    }

    return node;
  }
});
define('frampton-dom/ops/execute_patch', ['exports', 'frampton-dom/virtual/patch_types', 'frampton-dom/ops/remove_node', 'frampton-dom/ops/replace_node', 'frampton-dom/ops/reorder_nodes', 'frampton-dom/ops/insert_node', 'frampton-dom/ops/update_text', 'frampton-dom/ops/apply_attributes'], function (exports, _patch_types, _remove_node, _replace_node, _reorder_nodes, _insert_node, _update_text, _apply_attributes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = execute_patch;

  var _patch_types2 = _interopRequireDefault(_patch_types);

  var _remove_node2 = _interopRequireDefault(_remove_node);

  var _replace_node2 = _interopRequireDefault(_replace_node);

  var _reorder_nodes2 = _interopRequireDefault(_reorder_nodes);

  var _insert_node2 = _interopRequireDefault(_insert_node);

  var _update_text2 = _interopRequireDefault(_update_text);

  var _apply_attributes2 = _interopRequireDefault(_apply_attributes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function execute_patch(patch, messages, parentNode, currentNode) {

    var type = patch.type;
    var update = patch.update;

    switch (patch.type) {

      case _patch_types2.default.NONE:
        break;

      case _patch_types2.default.APPEND:
        return (0, _insert_node2.default)(parentNode, null, update, messages);

      case _patch_types2.default.INSERT:
        return (0, _insert_node2.default)(parentNode, currentNode, update, messages);

      case _patch_types2.default.REMOVE:
        return (0, _remove_node2.default)(currentNode);

      case _patch_types2.default.REPLACE:
        return (0, _replace_node2.default)(currentNode, update, messages);

      case _patch_types2.default.PROPS:
        return (0, _apply_attributes2.default)(currentNode, update, messages);

      case _patch_types2.default.TEXT:
        return (0, _update_text2.default)(currentNode, update);

      case _patch_types2.default.REORDER:
        return (0, _reorder_nodes2.default)(parentNode, currentNode, update);

      default:
        throw new Error('Unrecognized patch type: ' + type);
    }
  }
});
define('frampton-dom/ops/insert_node', ['exports', 'frampton-dom/ops/create_element', 'frampton-dom/utils/transition_in'], function (exports, _create_element, _transition_in) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = insert_node;

  var _create_element2 = _interopRequireDefault(_create_element);

  var _transition_in2 = _interopRequireDefault(_transition_in);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /*
   * @name insertNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} parent
   * @param {Element} current
   * @param {VirtualNode} vnode
   */
  function insert_node(parent, current, vnode, messages) {
    var child = (0, _create_element2.default)(vnode, messages);
    if (vnode.attributes.transitionIn) {
      (0, _transition_in2.default)(child, vnode.attributes.transitionIn);
    }
    if (parent) {
      if (current) {
        parent.insertBefore(child, current);
      } else {
        parent.appendChild(child);
      }
    }
  }
});
define('frampton-dom/ops/perform_inserts', ['exports', 'frampton-utils/is_numeric', 'frampton-dom/virtual/patch_types', 'frampton-dom/ops/execute_patch'], function (exports, _is_numeric, _patch_types, _execute_patch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = perform_inserts;

  var _is_numeric2 = _interopRequireDefault(_is_numeric);

  var _patch_types2 = _interopRequireDefault(_patch_types);

  var _execute_patch2 = _interopRequireDefault(_execute_patch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name performInserts
   * @memberof Frampton.DOM.Ops
   * @private
   * @param {Element} current
   * @param {Object} patches
   */
  function perform_inserts(current, patches, messages) {

    var arr = [];
    var len = current ? current.childNodes.length : 0;

    for (var i = 0; i < len; i++) {
      var child = current.childNodes[i];
      // Filter out nodes that are transitioning out
      if (child.nodeType === 3 || child.getAttribute('data-transition-out') !== 'true') {
        arr.push(child);
      }
    }

    var cursor = 0;

    for (var key in patches) {
      if ((0, _is_numeric2.default)(key)) {
        var update = patches[key];
        (0, _execute_patch2.default)(update, messages, current, arr[key - cursor]);
        if (update.type === _patch_types2.default.INSERT) {
          cursor += 1;
        }
      }
    }
  }
});
define("frampton-dom/ops/remove_node", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = remove_node;
  /*
   * @name removeNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} node
   */
  function remove_node(node) {
    if (node && node.parentNode) {
      var parent = node.parentNode;
      if (parent) {
        parent.removeChild(node);
      }
    }
  }
});
define('frampton-dom/ops/reorder_nodes', ['exports', 'frampton-utils/is_number', 'frampton-dom/utils/is_patch', 'frampton-dom/ops/remove_node', 'frampton-dom/utils/transition_out'], function (exports, _is_number, _is_patch, _remove_node, _transition_out) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reorder_nodes;

  var _is_number2 = _interopRequireDefault(_is_number);

  var _is_patch2 = _interopRequireDefault(_is_patch);

  var _remove_node2 = _interopRequireDefault(_remove_node);

  var _transition_out2 = _interopRequireDefault(_transition_out);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /*
   * @name reorderNodes
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} parent
   * @param {Array} order
   */
  function reorder_nodes(parent, current, order) {

    var children = current.childNodes;
    var len = children.length;
    var arr = [];
    var remove = [];
    var map = [];

    /**
     * If child nodes were still transitioning out from a previous invokation of
     * reorderNodes they will not be in our diff and need to be removed. Otherwise
     * we collect a reference to the children in their original order.
     */
    for (var i = 0; i < len; i++) {
      var child = children[i];
      if (child.nodeType === 1 && child.getAttribute('data-transition-out') === 'true') {
        remove.push(child);
      } else {
        arr.push(child);
      }
    }

    /**
     * Because transitions are applied asyncronously it is possible for nodes
     * transitioning out to still be in the DOM but not in our virtual DOM.
     */
    for (var _i = 0; _i < remove.length; _i++) {
      var _child = remove[_i];
      (0, _remove_node2.default)(_child);
    }

    // Easy look up for what new indexes should be
    for (var _i2 = 0; _i2 < order.length; _i2++) {
      var next = order[_i2];
      if ((0, _is_number2.default)(next)) {
        map[next] = _i2;
      }
    }

    /**
     * Cursor is used to keep our position when dealing with nodes that are
     * transitioning out, therefore still in the DOM but we don't want to
     * consider its position when inserting new elements.
     */
    var cursor = 0;

    for (var _i3 = 0; _i3 < len; _i3++) {

      var oldChild = arr[_i3];

      if (oldChild && order[_i3] === undefined) {
        (0, _remove_node2.default)(oldChild);
      }

      if ((0, _is_patch2.default)(order[_i3])) {
        (0, _transition_out2.default)(oldChild, order[_i3].update);
        cursor += 1;
      }

      var newChildIndex = map[_i3];
      var ref = current.childNodes[_i3 + cursor];

      if (newChildIndex !== undefined) {
        var node = arr[newChildIndex];

        // We have a new node, but no old node at this position.
        if (node && !ref) {
          current.appendChild(node);

          // We have an old node here, insert the new node before it.
        } else if (node && ref !== node) {
          current.insertBefore(node, ref);

          // Things stay the same.
        } else if (node && ref === node) {
          /* No move */
        }
      }
    }
  }
});
define('frampton-dom/ops/replace_node', ['exports', 'frampton-dom/ops/create_element'], function (exports, _create_element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replace_node;

  var _create_element2 = _interopRequireDefault(_create_element);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /*
   * @name replaceNode
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} oldNode Node to replace
   * @param {VirtualNode} vnode VirtualNode representing replacement
   */
  function replace_node(oldNode, vnode, messages) {
    if (oldNode) {
      var parent = oldNode.parentNode;
      var newNode = (0, _create_element2.default)(vnode, messages);
      if (parent) {
        parent.replaceChild(newNode, oldNode);
      }
    }
  }
});
define('frampton-dom/ops/reset_child_state', ['exports', 'frampton-utils/is_defined', 'frampton-dom/ops/remove_node'], function (exports, _is_defined, _remove_node) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reset_child_state;

  var _is_defined2 = _interopRequireDefault(_is_defined);

  var _remove_node2 = _interopRequireDefault(_remove_node);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function isTransitioningOut(child) {
    return (0, _is_defined2.default)(child) && child.nodeType === 1 && child.getAttribute('data-transition-out') === 'true';
  }

  /**
   * Nodes that are transitioning out should just be removed to get us in a good
   * state before performing the next set of updates.
   */
  function reset_child_state(node) {
    if (node && node.childNodes) {
      var children = node.childNodes;
      var len = children.length;
      for (var i = 0; i < len; i++) {
        var child = children[i];
        if (isTransitioningOut(child)) {
          (0, _remove_node2.default)(child);
        }
      }
    }
  }
});
define("frampton-dom/ops/update_text", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = update_text;
  /*
   * @name updateText
   * @memberOf Frampton.DOM
   * @method
   * @private
   * @param {Element} node Node to update
   * @param {String} text New text to display
   */
  function update_text(node, text) {
    if (node && node.textContent) {
      node.textContent = text;
    }
  }
});
define('frampton-dom/scene', ['exports', 'frampton-dom/utils/request_frame', 'frampton-dom/update'], function (exports, _request_frame, _update) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = scene;

  var _request_frame2 = _interopRequireDefault(_request_frame);

  var _update2 = _interopRequireDefault(_update);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var STATES = {
    NOTHING: 0,
    PENDING: 1
  };

  /**
   * Start a new VirtualDOM scene. The scene takes a root node to attach
   * to and returns a function to schedule updates. You give the scheduler
   * a new VirtualNode and it will schedule the diff and update of the
   * previous DOM.
   *
   * @name scene
   * @memberof Frampton.DOM
   * @method
   * @param {Element} rootNode The node to attach our scene to
   * @param {Function} messages A function to handle events in the DOM
   * @returns {Function} A function to schedule updates
   */
  function scene(rootNode, messages) {

    var savedDOM = null;
    var scheduledDOM = null;
    var state = STATES.NOTHING;

    function draw() {
      (0, _update2.default)({
        rootNode: rootNode,
        messages: messages,
        oldTree: savedDOM,
        newTree: scheduledDOM
      });
      savedDOM = scheduledDOM;
      state = STATES.NOTHING;
    }

    return function scheduler(dom) {
      scheduledDOM = dom;

      switch (state) {

        case STATES.NOTHING:
          (0, _request_frame2.default)(draw);
          state = STATES.PENDING;
          break;

        default:
          state = STATES.PENDING;
          break;
      }
    };
  }
});
define('frampton-dom/update', ['exports', 'frampton-utils/noop', 'frampton-dom/diff', 'frampton-dom/ops/apply_patch', 'frampton-dom/ops/apply_globals'], function (exports, _noop, _diff, _apply_patch, _apply_globals) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = run_update;

  var _noop2 = _interopRequireDefault(_noop);

  var _diff2 = _interopRequireDefault(_diff);

  var _apply_patch2 = _interopRequireDefault(_apply_patch);

  var _apply_globals2 = _interopRequireDefault(_apply_globals);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name update
   * @method
   * @memberof Frampton.DOM
   * @param {Object} config - The employee who is responsible for the project.
   * @param {Element} config.rootNode - The name of the employee.
   * @param {Function} config.messages - The employee's department.
   * @param {Frampton.DOM.VirtualNode} config.oldTree The old virtual dom
   * @param {Frampton.DOM.VirtualNode} config.newTree The new virtual dom
   */
  function run_update(config) {
    var patch = (0, _diff2.default)(config.oldTree, config.newTree);
    (0, _apply_patch2.default)(patch, config.messages || _noop2.default, config.rootNode, config.rootNode);
    (0, _apply_globals2.default)(config.rootNode);
  }
});
define('frampton-dom/utils/diff_class', ['exports', 'frampton-list/length', 'frampton-dom/utils/empty_class', 'frampton-dom/utils/validated_class'], function (exports, _length, _empty_class, _validated_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = diff_class;

  var _length2 = _interopRequireDefault(_length);

  var _empty_class2 = _interopRequireDefault(_empty_class);

  var _validated_class2 = _interopRequireDefault(_validated_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function diff_class(oldClass, newClass) {
    oldClass = (0, _validated_class2.default)(oldClass);
    newClass = (0, _validated_class2.default)(newClass);
    var oLen = (0, _length2.default)(oldClass.add);
    var nLen = (0, _length2.default)(newClass.add);
    var diff;

    for (var i = 0; i < oLen; i++) {
      if (newClass.add.indexOf(oldClass.add[i]) === -1) {
        diff = diff || (0, _empty_class2.default)();
        diff.remove = diff.remove || [];
        diff.remove.push(oldClass.add[i]);
      }
    }

    for (var _i = 0; _i < nLen; _i++) {
      if (oldClass.add.indexOf(newClass.add[_i]) === -1) {
        diff = diff || (0, _empty_class2.default)();
        diff.add = diff.add || [];
        diff.add.push(newClass.add[_i]);
      }
    }

    return diff;
  }
});
define('frampton-dom/utils/diff_props', ['exports', 'frampton-utils/is_object', 'frampton-utils/is_undefined', 'frampton-dom/utils/diff_class', 'frampton-dom/utils/validated_transition'], function (exports, _is_object, _is_undefined, _diff_class, _validated_transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = diff_props;

  var _is_object2 = _interopRequireDefault(_is_object);

  var _is_undefined2 = _interopRequireDefault(_is_undefined);

  var _diff_class2 = _interopRequireDefault(_diff_class);

  var _validated_transition2 = _interopRequireDefault(_validated_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function diff_props(oldProps, newProps) {

    var diff;

    for (var key in oldProps) {

      var oldValue = oldProps[key];
      var newValue = newProps[key];

      if ((0, _is_undefined2.default)(newValue)) {
        diff = diff || {};
        diff[key] = undefined;
      }

      if (key === 'style') {
        newValue = newValue || {};
      }

      if (key === 'transition') {
        oldValue = (0, _validated_transition2.default)(oldValue);
        newValue = (0, _validated_transition2.default)(newValue);
        var tempDiff = diff_props(oldValue, newValue);
        if (tempDiff) {
          diff = diff || {};
          diff[key] = tempDiff;
        }
      } else if (key === 'class') {
        newValue = newValue || '';
        var _tempDiff = (0, _diff_class2.default)(oldValue, newValue);
        if (_tempDiff) {
          diff = diff || {};
          diff[key] = _tempDiff;
        }
      } else if ((0, _is_object2.default)(oldValue) && (0, _is_object2.default)(newValue)) {
        var _tempDiff2 = diff_props(oldValue, newValue);
        if (_tempDiff2) {
          diff = diff || {};
          diff[key] = _tempDiff2;
        }
      } else if (oldValue !== newValue) {
        diff = diff || {};
        diff[key] = newValue;
      }
    }

    for (var _key in newProps) {
      if ((0, _is_undefined2.default)(oldProps[_key])) {
        var _newValue = newProps[_key];
        diff = diff || {};
        diff[_key] = _newValue;
      }
    }

    return diff;
  }
});
define('frampton-dom/utils/easing', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'in': 'ease-in',
    'out': 'ease-out',
    'in-out': 'ease-in-out',
    'snap': 'cubic-bezier(0,1,.5,1)',
    'linear': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
    'ease-in-quad': 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    'ease-in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
    'ease-in-quart': 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
    'ease-in-quint': 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    'ease-in-sine': 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
    'ease-in-expo': 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
    'ease-in-circ': 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
    'ease-in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    'ease-out-quad': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
    'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    'ease-out-sine': 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    'ease-out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'ease-out-circ': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
    'ease-in-out-sine': 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
    'ease-in-out-expo': 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
    'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
    'ease-in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
  };
});
define("frampton-dom/utils/empty_class", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = empty_class;
  function empty_class() {
    return {
      add: [],
      remove: []
    };
  }
});
define('frampton-dom/utils/empty_transition', ['exports', 'frampton-dom/utils/empty_class'], function (exports, _empty_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = empty_transition;

  var _empty_class2 = _interopRequireDefault(_empty_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function empty_transition() {
    return {
      from: {
        class: (0, _empty_class2.default)(),
        style: {}
      },
      to: {
        class: (0, _empty_class2.default)(),
        style: {}
      }
    };
  }
});
define('frampton-dom/utils/is_node', ['exports', 'frampton-utils/is_object'], function (exports, _is_object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_text;

  var _is_object2 = _interopRequireDefault(_is_object);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function is_text(node) {
    return (0, _is_object2.default)(node) && node.ctor === 'VirtualNode';
  }
});
define('frampton-dom/utils/is_patch', ['exports', 'frampton-utils/is_object'], function (exports, _is_object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_patch;

  var _is_object2 = _interopRequireDefault(_is_object);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function is_patch(node) {
    return (0, _is_object2.default)(node) && node.ctor === 'VirtualPatch';
  }
});
define('frampton-dom/utils/is_same_node', ['exports', 'frampton-utils/is_defined'], function (exports, _is_defined) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_same_node;

  var _is_defined2 = _interopRequireDefault(_is_defined);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function keysMatch(oldKey, newKey) {
    return (0, _is_defined2.default)(oldKey) && (0, _is_defined2.default)(newKey) && oldKey === newKey;
  }

  function is_same_node(oldNode, newNode) {
    return (0, _is_defined2.default)(oldNode) && (0, _is_defined2.default)(newNode) && oldNode.tagName === newNode.tagName && keysMatch(oldNode.key, newNode.key);
  }
});
define('frampton-dom/utils/is_text', ['exports', 'frampton-utils/is_object'], function (exports, _is_object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_text;

  var _is_object2 = _interopRequireDefault(_is_object);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function is_text(node) {
    return (0, _is_object2.default)(node) && node.ctor === 'VirtualText';
  }
});
define("frampton-dom/utils/node_at_index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = node_at_index;
  function node_at_index(node, index) {
    if (node && node.childNodes) {
      return node.childNodes[index] || null;
    } else {
      return null;
    }
  }
});
define('frampton-dom/utils/normalized_frame', ['exports', 'frampton-utils/is_number', 'frampton-list/contains', 'frampton-dom/utils/easing'], function (exports, _is_number, _contains, _easing) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = normalized_frame;

  var _is_number2 = _interopRequireDefault(_is_number);

  var _contains2 = _interopRequireDefault(_contains);

  var _easing2 = _interopRequireDefault(_easing);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var alias_mapping = {
    'duration': 'transition-duration',
    'delay': 'transition-delay'
  };

  var durations = (0, _contains2.default)(['transition-duration', 'transition-delay']);

  var pixels = (0, _contains2.default)(['height', 'width', 'left', 'top', 'right', 'bottom']);

  function normalized_frame(frame) {
    var obj = {};
    for (var key in frame) {
      if (alias_mapping[key]) {
        if ((0, _is_number2.default)(frame[key])) {
          obj[alias_mapping[key]] = frame[key] + 'ms';
        } else {
          obj[alias_mapping[key]] = frame[key];
        }
      } else if (pixels(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'px';
      } else if (durations(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'ms';
      } else if (key === 'transition-timing-function') {
        obj[key] = _easing2.default[frame[key]] ? _easing2.default[frame[key]] : frame[key];
      } else {
        obj[key] = frame[key];
      }
    }
    return obj;
  }
});
define('frampton-dom/utils/not_empty', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = notEmtpy;
  function notEmtpy(str) {
    return str.trim() !== '';
  }
});
define('frampton-dom/utils/props_diff', ['exports', 'frampton-dom/utils/diff_props'], function (exports, _diff_props) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = props_diff;

  var _diff_props2 = _interopRequireDefault(_diff_props);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function props_diff(oldNode, newNode) {
    return (0, _diff_props2.default)(oldNode.attributes, newNode.attributes);
  }
});
define("frampton-dom/utils/reflow", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reflow;
  /**
   * Forces browser reflow by reading the offsetHeight of given element
   *
   * @name reflow
   * @method
   * @private
   * @memberof Frampton.DOM.Utils
   * @param {Object} element DomNode to reflow
   */
  function reflow(element) {
    return element.offsetWidth;
  }
});
define('frampton-dom/utils/request_frame', ['exports', 'frampton-utils/is_function'], function (exports, _is_function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (callback) {
    if ((0, _is_function2.default)(window.requestAnimationFrame)) {
      window.requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 1000 / 60);
    }
  };

  var _is_function2 = _interopRequireDefault(_is_function);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});
define('frampton-dom/utils/transition_in', ['exports', 'frampton-dom/ops/apply_transition', 'frampton-dom/utils/validated_transition'], function (exports, _apply_transition, _validated_transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transitionIn;

  var _apply_transition2 = _interopRequireDefault(_apply_transition);

  var _validated_transition2 = _interopRequireDefault(_validated_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function handleTransition(node) {
    function eventHandler(evt) {
      if (evt.target === node) {
        node.removeEventListener('transitionend', eventHandler);
        node.removeAttribute('data-transition-in');
      }
    }
    node.addEventListener('transitionend', eventHandler);
  }

  function transitionIn(node, transition) {
    node.setAttribute('data-transition-in', 'true');
    (0, _apply_transition2.default)(node, (0, _validated_transition2.default)(transition));
    handleTransition(node);
  }
});
define('frampton-dom/utils/transition_out', ['exports', 'frampton-dom/ops/remove_node', 'frampton-dom/ops/apply_transition', 'frampton-dom/utils/validated_transition'], function (exports, _remove_node, _apply_transition, _validated_transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transitionOut;

  var _remove_node2 = _interopRequireDefault(_remove_node);

  var _apply_transition2 = _interopRequireDefault(_apply_transition);

  var _validated_transition2 = _interopRequireDefault(_validated_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function handleTransition(node) {
    function eventHandler(evt) {
      if (evt.target === node) {
        node.removeEventListener('transitionend', eventHandler);
        (0, _remove_node2.default)(node);
      }
    }
    node.addEventListener('transitionend', eventHandler);
  }

  function transitionOut(node, transition) {
    node.removeAttribute('data-transition-in');
    node.setAttribute('data-transition-out', 'true');
    (0, _apply_transition2.default)(node, (0, _validated_transition2.default)(transition));
    handleTransition(node);
  }
});
define('frampton-dom/utils/validated_class', ['exports', 'frampton-utils/is_array', 'frampton-utils/is_string', 'frampton-utils/is_object', 'frampton-dom/utils/not_empty', 'frampton-dom/utils/empty_class'], function (exports, _is_array, _is_string, _is_object, _not_empty, _empty_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validated_class;

  var _is_array2 = _interopRequireDefault(_is_array);

  var _is_string2 = _interopRequireDefault(_is_string);

  var _is_object2 = _interopRequireDefault(_is_object);

  var _not_empty2 = _interopRequireDefault(_not_empty);

  var _empty_class2 = _interopRequireDefault(_empty_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function splitClass(str) {
    return str.split(' ').filter(_not_empty2.default);
  }

  /**
   * @name validatedClass
   */
  function validated_class(str) {

    var newClass = (0, _empty_class2.default)();

    if ((0, _is_string2.default)(str)) {

      newClass.add = splitClass(str);
    } else if ((0, _is_object2.default)(str)) {

      if ((0, _is_array2.default)(str.add)) {
        newClass.add = str.add;
      } else if ((0, _is_string2.default)(str.add)) {
        newClass.add = splitClass(str.add);
      }

      if ((0, _is_array2.default)(str.remove)) {
        newClass.remove = str.remove;
      } else if ((0, _is_string2.default)(str.remove)) {
        newClass.remove = splitClass(str.remove);
      }
    }

    return newClass;
  }
});
define('frampton-dom/utils/validated_transition', ['exports', 'frampton-dom/utils/normalized_frame', 'frampton-dom/utils/validated_class', 'frampton-dom/utils/empty_transition'], function (exports, _normalized_frame, _validated_class, _empty_transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validated_transition;

  var _normalized_frame2 = _interopRequireDefault(_normalized_frame);

  var _validated_class2 = _interopRequireDefault(_validated_class);

  var _empty_transition2 = _interopRequireDefault(_empty_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function validated_transition(desc) {

    if (!desc) {
      return (0, _empty_transition2.default)();
    } else {

      var newTransition = (0, _empty_transition2.default)();

      if (desc.from) {
        newTransition.from.class = (0, _validated_class2.default)(desc.from.class);
        newTransition.from.style = (0, _normalized_frame2.default)(desc.from.style || {});
      }

      if (desc.to) {
        newTransition.to.class = (0, _validated_class2.default)(desc.to.class);
        newTransition.to.style = (0, _normalized_frame2.default)(desc.to.style || {});
      }

      if (desc.class) {
        newTransition.to.class = (0, _validated_class2.default)(desc.class);
      }

      if (desc.style) {
        newTransition.to.style = (0, _normalized_frame2.default)(desc.style || {});
      }

      return newTransition;
    }
  }
});
define('frampton-dom/virtual/node', ['exports', 'frampton-list/length', 'frampton-utils/is_defined', 'frampton-utils/is_array', 'frampton-utils/is_object', 'frampton-utils/is_string'], function (exports, _length, _is_defined, _is_array, _is_object, _is_string) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = VirtualNode;

  var _length2 = _interopRequireDefault(_length);

  var _is_defined2 = _interopRequireDefault(_is_defined);

  var _is_array2 = _interopRequireDefault(_is_array);

  var _is_object2 = _interopRequireDefault(_is_object);

  var _is_string2 = _interopRequireDefault(_is_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

    if (!(0, _is_string2.default)(name)) {
      throw new Error('VirtualNode must have a string name');
    }

    if ((0, _is_array2.default)(attrs)) {
      children = attrs;
    }

    attrs = (0, _is_object2.default)(attrs) ? attrs : noAttributes;
    children = (0, _is_array2.default)(children) ? children : noChildren;

    return {
      ctor: 'VirtualNode',
      id: attrs.id,
      key: (0, _is_defined2.default)(attrs.key) ? attrs.key : attrs.id,
      tagName: name,
      attributes: attrs,
      children: children,
      length: (0, _length2.default)(children)
    };
  }
});
define('frampton-dom/virtual/patch', ['exports', 'frampton-dom/virtual/patch_types'], function (exports, _patch_types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reorder = exports.text = exports.props = exports.replace = exports.remove = exports.insert = exports.none = undefined;

  var _patch_types2 = _interopRequireDefault(_patch_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var none = exports.none = function none(node, patch) {
    return VirtualPatch(_patch_types2.default.NONE, node, patch);
  };

  var insert = exports.insert = function insert(node, patch) {
    return VirtualPatch(_patch_types2.default.INSERT, node, patch);
  };

  var remove = exports.remove = function remove(node, patch) {
    return VirtualPatch(_patch_types2.default.REMOVE, node, patch);
  };

  var replace = exports.replace = function replace(node, patch) {
    return VirtualPatch(_patch_types2.default.REPLACE, node, patch);
  };

  var props = exports.props = function props(node, patch) {
    return VirtualPatch(_patch_types2.default.PROPS, node, patch);
  };

  var text = exports.text = function text(node, patch) {
    return VirtualPatch(_patch_types2.default.TEXT, node, patch);
  };

  var reorder = exports.reorder = function reorder(node, patch) {
    return VirtualPatch(_patch_types2.default.REORDER, node, patch);
  };
});
define("frampton-dom/virtual/patch_types", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    NONE: 0,
    INSERT: 1,
    REMOVE: 2,
    REPLACE: 3,
    PROPS: 4,
    REORDER: 5,
    TEXT: 6
  };
});
define('frampton-dom/virtual/text', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = VirtualText;
  /**
   * @name VirtualText
   * @memberof Frampton.DOM
   * @class
   * @private
   * @param {String} str Text content for new text node
   * @returns {VirtualText} A new VirtualText
   */
  function VirtualText(str) {
    return {
      ctor: 'VirtualText',
      text: str
    };
  }
});
require("frampton-dom");
})();
