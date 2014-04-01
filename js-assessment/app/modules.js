if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    createModule : function(str1, str2) {
      return (function (greeting, name) {
        var self = {};
        self.greeting = greeting;
        self.name = name;
        self.sayIt = function () {
          return self.greeting + ', ' + self.name;
        };
        return self;
      })(str1, str2);
    }
  };
});

