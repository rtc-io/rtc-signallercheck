var boombox = require('boombox');
var test = boombox(require('tape'));
var reTrailingSlash = /\/$/;

/**
  # rtc-signallercheck

  This is a small test suite that can be used to test whether a signalling
  server behaves as expected for working with the `rtc-signaller` module.

  ## Usage

  Eventually this will be hosted as a webpage somewhere, but in the meantime
  you can clone the repo and run the test from the command line:

  ```
  npm install -g rtc-signallercheck
  signallercheck --uri https://switchboard.rtc.io/
  ```

  This also works if you specify a ws or wss endpoint:

  ```
  signallercheck --uri wss://switchboard.rtc.io/primus
  ```

**/

module.exports = function(opts) {
  // initialise the target uri
  var uri = (opts || {}).uri || 'https://switchboard.rtc.io/';

  // can we establish a signaller connection
  require('./test-connect')(uri, opts);

  // can we communicate
  require('./test-multiannounce')(uri, opts);

  // can we send messages to each other
  require('./test-broadcast')(uri, opts);

  // concurency test
  require('./test-concurrency')(uri, opts);
};
