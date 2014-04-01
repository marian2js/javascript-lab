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
      var regex = /[aeiou]$/i;
      return regex.test(str);
    },

    captureThreeNumbers : function(str) {
      var regex = /\d{3}/i;
      var matches = regex.exec(str);
      return Array.isArray(matches) ? matches[0] : false;
    },

    matchesPattern : function(str) {
      var regex = /^(\d){3}-(\d){3}-(\d){4}$/;
      return regex.test(str);
    },

    isUSD : function(str) {
      var regex = /^\$(\d){1,3}((,(\d){3})*(\.(\d){2}){0,1})*$/;
      return regex.test(str);
    }
  };
});
