if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    valueAtBit: function(num, bit) {
      var binaryArr = num.toString(2).split('').reverse();
      var strBit = binaryArr[bit - 1];
      return parseInt(strBit);
    },

    base10: function(str) {
      var strNum = parseInt(str, 2).toString(10);
      return parseInt(strNum, 10)
    },

    convertToBinary: function(num) {
      var strNum = parseInt(num).toString(2);
      for (var i = strNum.length; i < 8; i++) {
        strNum = '0' + strNum;
      }
      return strNum
    },

    multiply: function(a, b) {
      var digits = 4;
      var result = a * b;
      var fixed4 = result.toFixed(digits);
      var exp = Math.pow(10, digits);
      return Math.round(fixed4 * exp) / exp;
    }
  };
});

