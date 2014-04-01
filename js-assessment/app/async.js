if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([ 'jquery' ], function($) {
  return {
    async : function(value) {
      return $.Deferred().resolve(value).promise();
    },

    manipulateRemoteData : function(url) {
      var defer = $.Deferred();
      $.get(url)
        .then(function (data) {
          data = data.people.map(function (people) {
            return people.name;
          }).sort();
          defer.resolve(data);
        });
      return defer.promise();
    }
  };
});
