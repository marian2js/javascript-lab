if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    fizzBuzz : function(num) {
      var result = '';
      if (num % 3 === 0) {
        result += 'fizz';
      }
      if (num % 5 === 0) {
        result += 'buzz';
      }
      if (result) {
        return result;
      }
      return typeof num === 'number' ? num : false;
    }
  };
});
