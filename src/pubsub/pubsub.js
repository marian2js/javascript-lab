function PubSub() {
  var events = {};
  var lastId = 0;

  /**
   * Trigger an event to subscriptors
   *
   * @param {string} key
   * @returns {boolean}
   */
  this.publish = function (key) {
    var publishEvent = events[key];
    if (!Array.isArray(publishEvent)) {
      return false;
    }

    // Remove the first argument
    [].shift.apply(arguments);

    // notify to all the subscriptors
    for (var i = 0, len = publishEvent.length; i < len; i++) {
      publishEvent[i].callback.apply(null, arguments);
    }
    return true;
  };

  /**
   * Add a new subscriptor as an event listener
   *
   * @param {string} key
   * @param {Function} callback
   * @returns {number}
   */
  this.subscribe = function (key, callback) {
    var id;

    // Key and callback are required!
    if (!key) {
      throw new Error('Key is required!');
    }
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    if (!Array.isArray(events[key])) {
      events[key] = [];
    }
    id = lastId++;
    events[key].push({
      id: id,
      callback: callback
    });
    return id;
  };

  /**
   * Remove a subscriptor to the event listener
   *
   * @param {number} id
   * @returns {boolean}
   */
  this.unsubscribe = function (id) {
    for (var key in events) {
      if (!events.hasOwnProperty(key)) {
        continue;
      }
      for (var i = 0, len = events[key].length; i < len; i++) {
        if (events[key][i].id === id) {
          events[key].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Returns the number of subscriptors to an event
   *
   * @param {string} key
   * @returns {number}
   */
  this.size = function (key) {
    return (events[key] && events[key].length) || 0;
  };
}