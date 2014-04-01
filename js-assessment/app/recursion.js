if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    listFiles: function(data, dirName) {
      var results = [];

      var findFiles = function findFiles (data, dirName, directoryMatch) {
        if (data.files) {
          directoryMatch |= data.dir === dirName;
          for (var i = 0, len = data.files.length; i < len; i++) {
            findFiles(data.files[i], dirName, directoryMatch);
          }
        } else if (directoryMatch) {
          results.push(data);
        }
      }(data, dirName, !dirName);

      return results;
    },

    permute: function(arr) {
      var result = [];
      var visited = [];
      var permute = function permute (arr) {
        if (~visited.indexOf(arr.join(','))) {
          return;
        }
        result.push(arr);
        visited.push(arr.join(','));
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i] = arr.splice(i - 1, 1, arr[i])[0];
          permute([].slice.call(arr));
        }
      }(arr);
      return result;
    }
  };
});
