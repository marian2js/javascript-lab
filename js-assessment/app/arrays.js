if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    indexOf : function(arr, item) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
          return i;
        }
      }
      return -1;
    },

    sum : function(arr) {
      var value = 0;
      for (var i = 0, len = arr.length; i < len; i++) {
        value += arr[i];
      }
      return value;
    },

    remove : function(arr, item) {
      var aux = [].slice.call(arr);
      for (var i = 0, len = aux.length; i < len; i++) {
        if (aux[i] === item) {
          aux.splice(i, 1);
        }
      }
      return aux;
    },

    removeWithoutCopy : function(arr, item) {
      for (var i = arr.length; i > 0; i--) {
        if (arr[i] === item) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },

    append : function(arr, item) {
      arr.push(item);
      return arr;
    },

    truncate : function(arr) {
      arr.pop();
      return arr;
    },

    prepend : function(arr, item) {
      arr.unshift(item);
      return arr;
    },

    curtail : function(arr) {
      arr.shift();
      return arr;
    },

    concat : function(arr1, arr2) {
      for (var i = 0, len = arr2.length; i < len; i++) {
        arr1.push(arr2[i]);
      }
      return arr1;
    },

    insert : function(arr, item, index) {
      arr.splice(index, 0, item);
      return arr;
    },

    count : function(arr, item) {
      var total = 0;
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
          total++;
        }
      }
      return total;
    },

    duplicates : function(arr) {
      var result = [];
      var previous = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (~previous.indexOf(arr[i]) && result.indexOf(arr[i]) === -1) {
          result.push(arr[i]);
        } else {
          previous.push(arr[i]);
        }
      }
      return result;
    },

    square : function(arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        arr[i] = Math.pow(arr[i], 2);
      }
      return arr;
    },

    findAllOccurrences : function(arr, target) {
      var indexes = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === target) {
          indexes.push(i);
        }
      }
      return indexes;
    }
  };
});
