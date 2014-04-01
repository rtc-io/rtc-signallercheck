var boombox = require('boombox');
var test = boombox(require('tape'));

module.exports = function(WebSocket, uri, opts) {
  var socket;

  test('create the socket connection: ' + uri, function(t) {
    t.plan(1);

    // create a websocket connection to the target server
    socket = new WebSocket(uri);
    t.ok(socket instanceof WebSocket, 'websocket instance created');
  });

  test('socket opened', function(t) {
    var handleOpen = t.pass.bind(t, 'socket open');

    t.plan(1);

    if (typeof socket.addEventListener == 'function') {
      socket.addEventListener('open', handleOpen);
    }
    else {
      socket.once('open', handleOpen);
    }
  });

  test('close connection', function(t) {
    t.plan(1);
    socket.close();
    t.pass('closed');
  });
};