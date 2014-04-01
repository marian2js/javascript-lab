if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    containsNumber : function(str) {
      var regex = /[0-9]+/;
      return regex.test(str);
    },

    containsRepeatingLetter : function(str) {
      var regex = /([a-z])\1/i;
      return regex.test(str);
    },

    endsWithVowel : function(str) {
      var regex = /.*[a|e|i|o|u]$/;
      return regex.test(str);
    },

    captureThreeNumbers : function(str) {

    },

    matchesPattern : function(str) {
      var regex = /(.*){3}-(.*){3}-(.*){3}/;
      return regex.test(str);
    },
    isUSD : function(str) {

    }
  };
});
