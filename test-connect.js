var boombox = require('boombox');
var test = boombox(require('tape'));
var uuid = require('uuid');

module.exports = function(messenger, opts) {
  var signaller;

  test('create the signaller', function(t) {
    t.plan(1);

    signaller = require('rtc-signaller')(messenger);
    signaller.once('connected', function() {
      t.pass('signaller connected');
    });
  });

  test('can announce and receive a room info reply', function(t) {
    var roomId = uuid.v4();

    t.plan(3);
    signaller.once('message:roominfo', function(data) {
      t.ok(data, 'got room info data');
      t.equal(data.memberCount, 1, 'new connection is the only member');
    });

    signaller.announce({ room: roomId });
    t.pass('sent announce');
  });

  test('close connection', function(t) {
    t.plan(1);
    signaller.once('disconnected', function() {
      t.pass('closed');
    });

    signaller.close();
  });
};
