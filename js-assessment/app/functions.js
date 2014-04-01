if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    argsAsArray : function(fn, arr) {
      return fn.apply(null, arr);
    },

    speak : function(fn, obj) {
      return fn.apply(obj, fn);
    },

    functionFunction : function(str) {
      return function (str2) {
        return str + ', ' + str2;
      }
    },

    makeClosures : function(arr, fn) {
      var result = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        result.push((function (i) {
          return function () {
            return fn(arr[i]);
          };
        })(i));
      }
      return result;

      /**
       * Alternative Solution:
       *
      return arr.map(function (item) {
        return function () {
          return fn(item);
        };
      });*/
    },

    partial : function(fn, str1, str2) {
      return function (str3) {
        return fn.call(null, str1, str2, str3);
      }
    },

    useArguments : function() {
      var result = 0;
      for (var key in arguments) {
        if (!arguments.hasOwnProperty(key)) {
          continue;
        }
        result += arguments[key];
      }
      return result;
    },

    callIt : function(fn) {
      var func = fn;

      // Remove the first argument
      [].shift.apply(arguments);

      return func.apply(null, arguments);
    },

    partialUsingArguments : function(fn) {
      var func = fn,
          args = arguments;

      // Remove the first argument
      [].shift.apply(args);

      return function () {
        // Create an array with the arguments of both functions
        var args2 = [].slice.call(arguments, 0);
        args = [].slice.call(args, 0);
        args = args.concat(args2);

        return func.apply(null, args);
      };
    },

    curryIt : function(fn) {
      var args = [];
      return function makeFns (val) {
        if (args.length === 3) {
          return fn.apply(null, args);
        }
        if (val) {
          args.push(val);
          return makeFns();
        }
        return makeFns;
      }();
    }
  };
});
