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

  // initialise the target uri
  var uri = server.replace(reTrailingSlash, '') + endpoint;

  require('./test-connect')(WS, uri);
};