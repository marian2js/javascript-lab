if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function () {
  return {
    count : function (start, end) {
      var logNextNumber,
          interval,
          cancelInterval;

      logNextNumber = function () {
        console.log(start++);
      };

      // print the next number every 100ms starting now
      logNextNumber();
      interval = setInterval(function () {
        logNextNumber();
        if (start > end) {
          cancelInterval();
        }
      }, 100);

      cancelInterval = function () {
        clearInterval(interval);
      };

      return {
        cancel: cancelInterval
      }
    }
  };
});