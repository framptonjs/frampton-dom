var FramptonBuild = require('frampton-build');
var packages = {
  'frampton-dom' : { trees: null }
}

var build = new FramptonBuild({
  name : 'frampton-dom',
  packages : packages
});

module.exports = build.getDistTree();