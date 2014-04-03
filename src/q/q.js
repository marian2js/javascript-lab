var Q = (function () {

  /**
   * @constructor
   */
  var Promise = function () {
    var self = this;
    this.isPromise = true;
    this._successCbs = [];
    this._errorCbs = [];

    /**
     * Add a new success callback
     *
     * @param {Function} successCb
     * @param {Function} [errorCb]
     * @param {Function} [completeCb]
     * @returns {Promise}
     */
    this.then = function (successCb, errorCb, completeCb) {
      if (typeof successCb === 'function') {
        self._successCbs.push(successCb);
      }
      if (typeof  errorCb === 'function') {
        self._errorCbs.push(errorCb);
      }
      if (typeof completeCb === 'function') {
        self._completedCb = completeCb;
      }
      return self;
    };

    /**
     * Add a new fail callback
     *
     * @param {Function} errorCb
     * @returns {Promise}
     */
    this.fail = function (errorCb) {
      if (typeof  errorCb === 'function') {
        self._errorCbs.push(errorCb);
      }
      return self;
    };

    /**
     * Add the complete callback
     *
     * @param {Function} completeCb
     */
    this.complete = function (completeCb) {
      if (typeof completeCb === 'function') {
        self._completedCb = completeCb;
      }
    };
  };

  /**
   * @constructor
   */
  var Defer = function () {
    var self = this;
    this.promise = new Promise;

    /**
     * Call a complete callback if it is defined
     */
    var completePromise = function () {
      if (self.promise._completedCb) {
        self.promise._completedCb();
      }
    };

    /**
     * Call all the success callbacks, or a fail callback if one fails
     */
    this.resolve = function (value) {
      var successCb;

      // if there are no more success callbacks, complete the promise
      if (!self.promise._successCbs.length) {
        return completePromise();
      }

      successCb = self.promise._successCbs.shift();
      value = successCb(value);

      // the value for the next callback can be a sync value or another Promise
      if (value && value.isPromise) {
        value
          .then(function (value) {
            return self.resolve(value);
          })
          .fail(function (error) {
            return self.reject(error);
          });
      } else {
        return self.resolve(value);
      }
    };

    /**
     * Call all the errors callbacks
     */
    this.reject = function (error) {
      var errorCb;

      // if there are no more success callbacks, complete the promise
      if (!self.promise._errorCbs.length) {
        return completePromise();
      }

      errorCb = self.promise._errorCbs.shift();
      error = errorCb(error);

      // the value for the next callback can be a sync value or another Promise
      if (error && error.isPromise) {
        error
          .complete(function (error) {
            return self.reject(error);
          });
      } else {
        return self.reject(error);
      }
    };
  };

  return {

    /**
     * Returns a new defer
     *
     * @returns {Defer}
     */
    defer: function () {
      return new Defer();
    }
  }

})();