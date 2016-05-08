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
define("frampton-dom.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/apply_patch.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/diff_props.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/diff.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/html/dom.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/scene.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define('frampton-dom/tests/diff_props_test', ['exports', 'frampton-dom/diff_props'], function (exports, _framptonDomDiff_props) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff = _interopRequireDefault(_framptonDomDiff_props);

  QUnit.module('Frampton.DOM.diffProps');

  QUnit.test('Should correctly diff two objects', function () {
    var oldProps = {
      one: 'one',
      two: 'two',
      three: 'three'
    };
    var newProps = {
      one: 'one two',
      three: 'three',
      four: 'four'
    };
    var expectedDiff = {
      one: 'one two',
      two: undefined,
      four: 'four'
    };
    deepEqual(_diff['default'](oldProps, newProps), expectedDiff);
  });

  QUnit.test('Should correctly diff nested objects', function () {
    var oldProps = {
      one: 'one',
      two: {
        thrity: 'thirty'
      },
      three: {
        eight: 'eight',
        ten: 'ten'
      }
    };
    var newProps = {
      one: 'one two',
      three: {
        eight: 'seven',
        twelve: 'twelve'
      },
      four: 'four'
    };
    var expectedDiff = {
      one: 'one two',
      two: undefined,
      three: {
        eight: 'seven',
        ten: undefined,
        twelve: 'twelve'
      },
      four: 'four'
    };
    deepEqual(_diff['default'](oldProps, newProps), expectedDiff);
  });
});
define("frampton-dom/tests/diff_props_test.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define('frampton-dom/tests/diff_test', ['exports', 'frampton-dom/diff', 'frampton-dom/virtual/patch_types', 'frampton-dom/html/dom'], function (exports, _framptonDomDiff, _framptonDomVirtualPatch_types, _framptonDomHtmlDom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff = _interopRequireDefault(_framptonDomDiff);

  var _TYPES = _interopRequireDefault(_framptonDomVirtualPatch_types);

  QUnit.module('Frampton.DOM.diff');

  QUnit.test('Should correctly diff two VirtualNodes', function () {

    var div_1 = _framptonDomHtmlDom.div({}, []);
    var div_2 = _framptonDomHtmlDom.div({}, [_framptonDomHtmlDom.div()]);
    var expected = [];
    expected._p = {
      ctor: 'VirtualPatch',
      type: _TYPES['default'].REPLACE,
      node: {
        ctor: 'VirtualNode',
        tagName: 'div',
        attributes: {},
        children: [],
        length: 0
      },
      update: {
        ctor: 'VirtualNode',
        tagName: 'div',
        attributes: {},
        children: [{
          ctor: 'VirtualNode',
          tagName: 'div',
          attributes: {},
          children: [],
          length: 0
        }],
        length: 1
      }
    };

    deepEqual(_diff['default'](div_1, div_2), [expected]);
  });
});
define("frampton-dom/tests/diff_test.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define('frampton-dom/tests/html/dom_test', ['exports', 'frampton-dom/html/dom'], function (exports, _framptonDomHtmlDom) {
  'use strict';

  QUnit.module('Frampton.DOM.Html');

  QUnit.test('Should corectly construct a VirtualNode', function () {
    var test = _framptonDomHtmlDom.div({}, []);
    var expected = {
      ctor: 'VirtualNode',
      tagName: 'div',
      attributes: {},
      children: [],
      length: 0
    };
    deepEqual(test, expected);
  });

  QUnit.test('Should corectly assign defaults', function () {
    var test = _framptonDomHtmlDom.div();
    var expected = {
      ctor: 'VirtualNode',
      tagName: 'div',
      attributes: {},
      children: [],
      length: 0
    };
    deepEqual(test, expected);
  });

  QUnit.test('Should corectly handle children', function () {
    var test = _framptonDomHtmlDom.div({}, [_framptonDomHtmlDom.h1({}, [_framptonDomHtmlDom.text('test')])]);
    var expected = {
      ctor: 'VirtualNode',
      tagName: 'div',
      attributes: {},
      children: [{
        ctor: 'VirtualNode',
        tagName: 'h1',
        attributes: {},
        children: [{
          ctor: 'VirtualText',
          text: 'test'
        }],
        length: 1
      }],
      length: 1
    };
    deepEqual(test, expected);
  });
});
define("frampton-dom/tests/html/dom_test.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/update.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/apply_attributes.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/create_element.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/insert_node.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/is_node.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/is_text.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/remove_node.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/replace_node.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/request_frame.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/utils/update_text.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/virtual/node.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/virtual/patch_types.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/virtual/patch.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
define("frampton-dom/virtual/text.jshint", ["exports"], function (exports) {
  "use strict";

  undefined;
});
})();