describe('PubSub', function () {
  var cb = function (data) {
    console.log(data);
  };
  var pubsub;

  /**
   * Create a new instance of the tested library
   */
  beforeEach(function () {
    return pubsub = new PubSub();
  });

  /**
   * Test if the size is initialized as 0
   */
  it('should not have subscriptors in an empty event', function () {
    expect(pubsub.size('event')).toBe(0);
  });

  /**
   * Test if the number of subscritor is increased correctly
   */
  it('should count the number of subscriptors for each event', function () {
    pubsub.subscribe('key', cb);
    pubsub.subscribe('key', cb);
    pubsub.subscribe('key', cb);
    pubsub.subscribe('key2', cb);
    pubsub.subscribe('key2', cb);
    expect(pubsub.size('key')).toBe(3);
    expect(pubsub.size('key2')).toBe(2);
    expect(pubsub.size('key3')).toBe(0);
  });

  /**
   * Test if the number of subscriptors is decreased correctly
   */
  it('should decrease the number of subscriptors on unsubscriptions', function () {
    var id = pubsub.subscribe('key', cb);
    pubsub.subscribe('key', cb);
    pubsub.unsubscribe(id);
    pubsub.unsubscribe(123456);
    expect(pubsub.size('key')).toBe(1);
  });

  /**
   * Test if the subscription returns an id and it is unique
   */
  it('should return an unique id for each event', function () {
    var id = pubsub.subscribe('key', cb);
    var id2 = pubsub.subscribe('key', cb);
    expect(id).not.toBe(id2);
  });

  /**
   * Test if a message is received by the subscriptor
   */
  it('should publish correctly', function (done) {
    pubsub.subscribe('key', function (val) {
      expect(val).toBe('val1');
      done();
    });
    pubsub.publish('key', 'val1');
  });

  /**
   * Test if the publish on non existent event returns false
   */
  it('should returns false if there are no subscriptors for an event', function () {
    expect(pubsub.publish('non existent key')).toBe(false);
  });

  /**
   * Test if a publish can send multiple attributes
   */
  it('should publish with multiple attributes', function (done) {
    pubsub.subscribe('key', function (val1, val2, val3, val4, val5) {
      expect(val1).toBe('val1');
      expect(val2).toBe('val2');
      expect(val3).toBe('val3');
      expect(val4).toBe('val4');
      expect(val5).toBe('val5');
      done();
    });
    pubsub.publish('key', 'val1', 'val2', 'val3', 'val4', 'val5');
  });
});