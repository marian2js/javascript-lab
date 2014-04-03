var GitHub = (function () {
  var oauthUrl = 'https://github.com/login/oauth/authorize',
      accessTokenUrl = 'http://localhost:3000/login',
      client_id = 'bd6c9941dd390ba5d8aa',
      scopes = 'user,repo';

  /**
   * Base url to the proxy for GitHub API
   *
   * @type {string}
   */
  this.apiBase = 'http://localhost:3000/api';

  /**
   * Returns the GitHub access token from url query param or local storage
   * If the user is not logged with GitHub returns null
   *
   * @param {string} [search] by default is location.search
   * @returns {string}
   */
  this.getTemporalCode = function (search) {
    var code = null;
    if (!search) {
      search = location.search;
    }
    if (search) {
      code = search.split('code=')[1];
      if (code) {
        code = code.split('&')[0];
      }
    }
    return code;
  };

  /**
   * Returns the GitHub login url
   * This is useful to obtain the temporal code
   *
   * @returns {string}
   */
  this.getLoginUrl = function () {
    return oauthUrl + '?client_id=' + client_id + '&scope=' + scopes;
  };

  /**
   * Promise the user access token from the temporal code
   *
   * @param {string} code
   * @returns {Promise.<string>}
   */
  this.getAccessToken = function (code) {
    return Ajax.post(accessTokenUrl + '?code=' + code)
      .then(function (httpRequest) {
        var data = httpRequest.responseText;
        var token = data.split('access_token=')[1];
        if (token) {
          return token.split('&')[0];
        }
        return null;
      });
  };

  return this;
})();