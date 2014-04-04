describe('User', function () {
  var user;

  /**
   * Perform a fake login
   *
   * @param {User} user
   * @returns {Promise}
   */
  var fakeLogin = function (user) {
    spyOn(GitHub, 'getAccessToken').and.callFake(function () {
      var defer = Q.defer();
      setTimeout(function () {
        defer.resolve({
          responseText: 'fake_access_token'
        });
      }, 100);
      return defer.promise;
    });
    return user.login('code');
  };

  describe('login process', function () {

    /**
     * Test if when the instance is created, the user is not logged in
     */
    it('should not start logged in', function () {
      user = new User;
      expect(user.isLogged()).toBe(false);
    });

    /**
     * Test if an user can be logged in GitHub
     */
    it('should login an user on GitHub', function (done) {
      user = new User;
      fakeLogin(user)
        .then(function () {
          expect(user.isLogged()).toBe(true);
        })
        .fail(function () {
          throw new Error('Error trying to log in an user');
        })
        .complete(done);
    });

    /**
     * Test if an user can be logged out
     */
    it('should logout an user from GitHub', function (done) {
      user = new User;
      fakeLogin(user)
        .then(function () {
          user.logout();
          expect(user.isLogged()).toBe(false);
        })
        .complete(done);
    });

  });

  describe('fetch data from GitHub', function () {

    beforeEach(function (done) {
      user = new User;
      fakeLogin(user)
        .then(done);
    });

    /**
     * Test if the data can be fetched from GitHub
     */
    it('should fetch the logged user info from GitHub', function () {
      spyOn(Ajax, 'get').and.callFake(function () {
        var defer = Q.defer();
        setTimeout(function () {
          defer.resolve({
            responseText: JSON.stringify(mockUser)
          });
        }, 100);
        return defer.promise;
      });
      user.fetch()
        .then(function () {
          expect(user.get('login')).toBe('fake_user');
          expect(user.get('id')).toBe(123456789);
          expect(user.get('url')).toBe('https://api.github.com/users/fake_user');
          expect(user.get('html_url')).toBe('https://github.com/fake_user');
        });
    });

    /**
     * Test if the starred repos can be fetched from GitHub
     */
    it('should fetch the logged user starred repos from GitHub', function () {
      spyOn(Ajax, 'get').and.callFake(function () {
        var defer = Q.defer();
        setTimeout(function () {
          defer.resolve({
            responseText: JSON.stringify(mockStarred)
          });
        }, 100);
        return defer.promise;
      });
      user.fetchStarred()
        .then(function () {
          var starred = user.getStarred();
          expect(Array.isArray(starred)).toBe(true);
          expect(starred.length).toBe(2);
          expect(starred[0].id).toBe(460078);
          expect(starred[0].name).toBe('angular.js');
        });
    });

    /**
     * Test if a repository can be unstarred
     */
    it('should remove a starred repository from GitHub', function () {
      spyOn(Ajax, 'delete').and.callFake(function () {
        var defer = Q.defer();
        setTimeout(function () {
          defer.resolve({
            responseText: ''
          });
        }, 100);
        return defer.promise;
      });
      user.deleteStarred('angular', 'angular.js')
        .then(function () {
          var starred = user.getStarred();
          expect(Array.isArray(starred)).toBe(true);
          expect(starred.length).toBe(1);
          expect(starred[0].id).toBe(14286864);
          expect(starred[0].name).toBe('rode');
        });
    });

  });

  describe('CRUD operations', function () {

    beforeEach(function () {
      user = new User;
      user.set('KEY', 'VALUE');
    });

    /**
     * Test get()
     */
    it('should get a value correctly', function () {
      expect(user.get('KEY')).toBe('VALUE');
      expect(user.get('FAKE KEY')).not.toBeDefined();
    });

    /**
     * Test has()
     */
    it('should check if a value is defined', function () {
      expect(user.has('KEY')).toBe(true);
      expect(user.has('FAKE KEY')).toBe(false);
    });

    /**
     * Test set()
     */
    it('should set a value correctly', function () {
      user.set('KEY', 123);
      expect(user.get('KEY')).toBe(123);
    });

    /**
     * Test delete()
     */
    it('should remove a value correctly', function () {
      user.delete('KEY');
      expect(user.get('KEY')).not.toBeDefined();
    });
  });

});