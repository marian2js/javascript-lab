describe('Q', function () {

  /**
   * Async function that success if val is true or fails otherwise
   *
   * @param {boolean} val
   * @returns {Promise}
   */
  var async = function (val) {
    var defer = Q.defer();
    setTimeout(function () {
      if (val) {
        defer.resolve(true);
      } else {
        defer.reject('This is an expected error');
      }
    }, 100);
    return defer.promise;
  };

  /**
   * Test if then is called and resolved value is sent to it
   */
  it('should call then method on success', function (done) {
   async(true)
      .then(function (val) {
        expect(val).toBe(true);
        done();
      })
      .fail(function () {
        throw new Error('It should never be here');
      });
  });

  /**
   * Test if fail is called and rejected error is sent to it
   */
  it('should call fail method on error', function (done) {
    async(false)
      .then(function () {
        throw new Error('It should never be here');
      })
      .fail(function (err) {
        expect(err).toBe('This is an expected error');
        done();
      });
  });

  /**
   * Test if complete is called on resolve
   */
  it('should call complete on success', function (done) {
    async(true)
      .then(function (val) {
        expect(val).toBe(true);
      })
      .complete(done);
  });

  /**
   * Test if complete is called on reject
   */
  it('should call complete on error', function (done) {
    async(false)
      .fail(function (err) {
        expect(err).toBe('This is an expected error');
      })
      .complete(done);
  });

  /**
   * Test if chained thens are called on resolve
   */
  it('should chain multiple "thens"', function (done) {
    async(true)
      .then(function () {
        return 'value';
      })
      .then(function (val) {
        expect(val).toBe('value');
        return 'value 2';
      })
      .then(function (val) {
        expect(val).toBe('value 2');
      })
      .fail(function () {
        throw new Error('It should never be here');
      })
      .complete(done);
  });

  /**
   * Test if thens can return a Promise and the next then receive the value
   */
  it('should allow "thens" to return a Promise', function (done) {
    async(true)
      .then(function () {
        return async(true);
      })
      .then(function (val) {
        expect(val).toBe(true);
        return async(true);
      })
      .then(function (val) {
        expect(val).toBe(true);
      })
      .fail(function () {
        throw new Error('It should never be here');
      })
      .complete(done);
  });

  /**
   * Test if a fail is called when a chained then returns a failed Promise
   */
  it('should call a successful Promise and then a failed one', function (done) {
    async(true)
      .then(function () {
        return async(false);
      })
      .then(function () {
        throw new Error('It should never be here');
      })
      .fail(function (error) {
        expect(error).toBe('This is an expected error');
      })
      .complete(done);
  });

});