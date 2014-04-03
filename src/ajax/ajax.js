var Ajax = (function () {
  var self = function (options) {
    var defer = Q.defer();
    var params = '';
    var httpRequest;

    /**
     * Notify when the response is ready
     */
    var onReadyStateChange = function () {
      if (httpRequest.readyState === 4) {
        onResponseReceived();
      }
    };

    /**
     * Resolve or reject the Ajax call depending of the response status code
     */
    var onResponseReceived = function () {
      if (httpRequest.status === 200) {
        defer.resolve(httpRequest);
      } else {
        defer.reject(httpRequest);
      }
    };

    // use XMLHttpRequest if browser is Mozilla or a WebKit browser, and ActiveXObject for IE8+
    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      throw new Error('Your browser is not supported');
    }

    // create a query string with the requested data
    if (typeof options.data === 'object') {
      for (var key in options.data) {
        if (options.data.hasOwnProperty(key)) {
          params += key + '=' + options.data[key] + '&';
        }
      }
    }

    httpRequest.open(options.method, options.uri, true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.setRequestHeader('Content-length', params.length);
    httpRequest.setRequestHeader('Connection', 'close');
    httpRequest.onreadystatechange = onReadyStateChange;
    httpRequest.send(params);
    return defer.promise;
  };

  /**
   * Shortcut for GET requests
   */
  self.get = function (uri, data) {
    return self({
      uri: uri,
      method: 'GET',
      data: data
    });
  };

  /**
   * Shortcut for POST requests
   */
  self.post = function (uri, data) {
    return self({
      uri: uri,
      method: 'POST',
      data: data
    });
  };

  /**
   * Shortcut for PUT requests
   */
  self.put = function (uri, data) {
    return self({
      uri: uri,
      method: 'PUT',
      data: data
    });
  };

  /**
   * Shortcut for DELETE requests
   */
  self.delete = function (uri, data) {
    return self({
      uri: uri,
      method: 'DELETE',
      data: data
    });
  };

  return self;
})();