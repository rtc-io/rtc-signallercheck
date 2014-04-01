var boombox = require('boombox');
var test = boombox(require('tape'));
var signaller = require('rtc-signaller');
var reTrailingSlash = /\/$/;

module.exports = function(opts) {
  // initialise the server
  var server = (opts || {}).server || 'http://rtc.io/switchboard';

  // determine the WebSocket constructor
  var WS = (opts || {}).WebSocket ||
    (typeof WebSocket != 'undefined' ? WebSocket : require('ws'));

  // initialise the ws endpoint
  var endpoint = (opts || {}).endpoint || '/primus';
  var socket;

  test('create the socket connection', function(t) {
    t.plan(1);

    // create a websocket connection to the target server
    socket = new WS(server.replace(reTrailingSlash, '') + endpoint);
    t.ok(socket instanceof WS, 'websocket instance created');
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