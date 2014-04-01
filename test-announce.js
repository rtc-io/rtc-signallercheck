var boombox = require('boombox');
var test = boombox(require('tape'));
var signaller = require('rtc-signaller');
var uuid = require('uuid');

module.exports = function(WebSocket, uri, opts) {
  var socket;
  var s;

  test('create a socket: ' + uri, function(t) {
    t.plan(1);
    t.ok(socket = new WebSocket(uri), 'created');
  });

  test('wrap the socket in a signaller', function(t) {
    t.plan(1);
    s = signaller(socket, {
      writeMethod: 'send'
    });

    s.once('open', t.pass.bind(t, 'signaller opened'));
  });

  test('can announce and receive a room info reply', function(t) {
    var roomId = uuid.v4();

    t.plan(3);
    s.once('roominfo', function(data) {
      t.ok(data, 'got room info data');
      t.equal(data.memberCount, 1, 'new connection is the only member');
    });

    s.announce({ room: roomId });
    t.pass('sent announce');
    
  });

  test('close the socket', function(t) {
    t.plan(1);
    socket.close();
    t.pass('done');
  });
};