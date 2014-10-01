var boombox = require('boombox');
var test = boombox(require('tape'));
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
  node test.js --uri ws://rtc.io/switchboard/primus
  ```

**/

module.exports = function(opts) {
  // initialise the target uri
  var uri = (opts || {}).uri || 'wss://switchboard.rtc.io/rtc.io/primus';

  // can we establish a signaller connection
  require('./test-connect')(uri, opts);

  // can we communicate
  require('./test-multiannounce')(uri, opts);

  // can we send messages to each other
  require('./test-broadcast')(uri, opts);
};
