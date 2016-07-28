const FramptonBuild = require('frampton-build');
const packages = {
  'frampton-dom' : { trees: null }
}

const build = new FramptonBuild({
  name : 'frampton-dom',
  packages : packages
});

module.exports = build.getDistTree();
