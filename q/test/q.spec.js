describe('Q', function () {
  var jasmine = this;

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
        defer.reject('It should never be here');
      }
    }, 100);
    return defer.promise;
  };

  it('should call then method on success', function (done) {
   async(true)
      .then(function (val) {
        expect(val).toBe(true);
        done();
      })
      .fail(function () {
        jasmine.fail(Error('It should never be here'));
      });
  });

  it('should call fail method on error', function (done) {
    async(false)
      .then(function () {
        jasmine.fail(Error('It should never be here'));
        done();
      })
      .fail(function (err) {
        expect(err).toBe('This is an expected error');
        done();
      });
  });

  it('should call complete on success', function (done) {
    async(true)
      .then(function (val) {
        expect(val).toBe(true);
      })
      .complete(done);
  });

  it('should call complete on error', function (done) {
    async(false)
      .fail(function (err) {
        expect(err).toBe('This is an expected error');
      })
      .complete(done);
  });

});