describe('Ajax', function () {

  /**
   * Helper for fail if ajax request fails
   *
   * @param {XMLHttpRequest} httpRequest
   */
  var ajaxFail = function (httpRequest) {
    throw new Error('Ajax fails with statusCode = ' + httpRequest.status)
  };

  describe('fake ajax calls', function () {

    /**
     * Spy on window.XMLHttpRequest
     */
    beforeEach(function () {
      spyOn(window, 'XMLHttpRequest').and.callFake(function() {
        this.open = function (method, uri) {
          this.method = method;
          this.uri = uri;
        };
        this.send = function () {
          var self = this;
          setTimeout(function () {
            self.responseText = '{ "uri": "'  + self.uri + '", "method": "' + self.method + '" }';
            self.readyState = 4;
            self.status = 200;
            self.onreadystatechange();
          }, 100);
        };
        this.setRequestHeader = function () {};
        return this;
      });
    });

    /**
     * Make an ajax call and test the fake data from the spy
     *
     * @param {string} uri
     * @param {string} method
     * @param {object} data
     * @param {Function} done
     */
    var fakeAjaxCall = function (uri, method, data, done) {
      Ajax[method.toLowerCase()](uri, data)
        .then(function (httpRequest) {
          var data = JSON.parse(httpRequest.responseText);
          expect(httpRequest.status).toBe(200);
          expect(data.method).toBe(method);
          expect(data.uri).toBe(uri);
        })
        .fail(ajaxFail)
        .complete(done);
    };

    /**
     * Test an ajax call with method GET
     */
    it('should make an ajax request with method GET', function (done) {
      var url = 'http://example.com/api/user/123';
      fakeAjaxCall(url, 'GET', {}, done);
    });

    /**
     * Test an ajax call with method POST
     */
    it('should make an ajax request with method POST', function (done) {
      var url = 'http://example.com/api/user';
      var data = {
        username: 'new user'
      };
      fakeAjaxCall(url, 'POST', data, done);
    });

    /**
     * Test an ajax call with method PUT
     */
    it('should make an ajax request with method PUT', function (done) {
      var url = 'http://example.com/api/user/123';
      var data = {
        name: 'Example'
      };
      fakeAjaxCall(url, 'PUT', data, done);
    });

    /**
     * Test an ajax call with method DELETE
     */
    it('should make an ajax request with method DELETE', function (done) {
      var url = 'http://example.com/api/user/123';
      fakeAjaxCall(url, 'DELETE', {}, done);
    });

  });

  describe('real ajax calls', function () {

    /**
     * Test a real ajax call with method GET
     *
     * @link http://jsontest.com
     */
    it('should make a real ajax request with method GET', function (done) {
      var url  = 'http://echo.jsontest.com/key/value/key2/value2';
      Ajax.get(url)
        .then(function (httpRequest) {
          var data = JSON.parse(httpRequest.responseText);
          expect(httpRequest.status).toBe(200);
          expect(data.key).toBe('value');
          expect(data.key2).toBe('value2');
        })
        .fail(ajaxFail)
        .complete(done);
    });

    /**
     * Test a real ajax call with method POST
     *
     * @link http://jsontest.com
     */
    it('should make a real ajax request with method POST', function (done) {
      var url = 'http://validate.jsontest.com/';
      var data = {
        json: JSON.stringify({ key: 'value' })
      };
      Ajax.post(url, data)
        .then(function (httpRequest) {
          var data = JSON.parse(httpRequest.responseText);
          expect(httpRequest.status).toBe(200);
          expect(data.validate).toBe(true);
        })
        .fail(ajaxFail)
        .complete(done);
    });

  });

});