var boombox = require('boombox');
var test = boombox(require('tape'));
var signaller = require('rtc-signaller');
var reTrailingSlash = /\/$/;

/**
  # rtcio-signaller-compatibility

  This is a small test suite that can be used to test whether a signalling
  server behaves as expected for working with the `rtc-signaller` module.

  ## Usage

  Eventually this will be hosted as a webpage somewhere, but in the meantime
  you can clone the repo and run the test from the command line:

  ```
  git clone https://github.com/rtc-io/rtcio-signaller-compatibility.git
  cd rtcio-signaller-compatibility
  npm install
  node test.js --uri http://rtc.io/switchboard/primus
  ```
  
**/

module.exports = function(opts) {
  // determine the WebSocket constructor
  var WS = (opts || {}).WebSocket ||
    (typeof WebSocket != 'undefined' ? WebSocket : require('ws'));

  // initialise the target uri
  var uri = (opts || {}).uri || 'http://rtc.io/switchboard/primus';

  require('./test-connect')(WS, uri);
};