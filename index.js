var boombox = require('boombox');
var test = boombox(require('tape'));
var signaller = require('rtc-signaller');
var WebSocket = require('ws');
var reTrailingSlash = /\/$/;

module.exports = function(opts) {
  // initialise the server
  var server = (opts || {}).server || 'http://rtc.io/switchboard';

  // initialise the ws endpoint
  var endpoint = (opts || {}).endpoint || '/primus';
  var socket;

  test('create the socket connection', function(t) {
    t.plan(1);

    // create a websocket connection to the target server
    socket = new WebSocket(server.replace(reTrailingSlash, '') + endpoint);
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