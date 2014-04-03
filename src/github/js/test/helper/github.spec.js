describe('GitHub', function () {

  /**
   * Test if GitHub temporal code is retrieved from location.search
   */
  it('should returns the github temporal code from location.search', function () {
    var fakeCode = 'THE CODE FROM GITHUB';
    var search = '?key=value&code=' + fakeCode + '&key2=value2';
    expect(GitHub.getTemporalCode(search)).toBe('THE CODE FROM GITHUB');
  });

  /**
   * Test if the API base url is the expected
   */
  it('should returns the API base url', function () {
    var expectUrl = 'http://localhost:3000/api';
    expect(GitHub.apiBase).toBe(expectUrl);
  });

  /**
   * Test if the GitHub login url is the expected
   */
  it('should returns the github login url', function () {
    var expectedUrl = 'https://github.com/login/oauth/authorize?client_id=bd6c9941dd390ba5d8aa&scope=user,repo';
    expect(GitHub.getLoginUrl()).toBe(expectedUrl);
  });

  /**
   * Test if the GitHub access token is retrieved from GitHub
   */
  it('should returns the user access token', function (done) {
    spyOn(Ajax, 'post').and.callFake(function () {
      var defer = Q.defer();
      setTimeout(function () {
        defer.resolve({
          responseText: 'access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&scope=user%2Cgist&token_type=bearer'
        });
      }, 100);
      return defer.promise;
    });

    GitHub.getAccessToken('fakeCode')
      .then(function (token) {
        expect(token).toBeDefined();
      })
      .fail(function () {
        throw new Error('Error getting the access token');
      })
      .complete(done);
  });

});
