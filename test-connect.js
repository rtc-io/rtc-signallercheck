var boombox = require('boombox');
var test = boombox(require('tape'));

module.exports = function(WebSocket, uri, opts) {
  var socket;

  test('create the socket connection', function(t) {
    t.plan(1);

    // create a websocket connection to the target server
    socket = new WebSocket(uri);
    t.ok(socket instanceof WebSocket, 'websocket instance created');
  });

  test('socket opened', function(t) {
    t.plan(1);
    socket.once('open', t.pass.bind(t, 'socket open'));
  });

  test('close connection', function(t) {
    t.plan(1);
    socket.close();
    t.pass('closed');
  });
};