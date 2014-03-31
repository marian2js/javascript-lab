var path = require('path');
var traceur = require('traceur');

// ES6 files
traceur.require.makeDefault(function(filename) {
  return filename.startsWith(__dirname) && !filename.startsWith(path.join(__dirname, 'node_modules'));
});