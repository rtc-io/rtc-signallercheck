var test = require('tape');
var times = require('whisk/times');
var pluck = require('whisk/pluck');
var uuid = require('uuid');
var signaller = require('rtc-signaller');

module.exports = function(messenger, opts) {
  var room = uuid();
  var signallers = [];
  var signallerCount = (opts || {}).concurrency || 50;

  test('create signallers', function(t) {
    var pending;

    function connectNext() {
      var idx;
      var sig = signaller(messenger).once('connected', function() {
        t.pass('signaller ' + idx + ' connected');

        if (signallers.length < signallerCount) {
          connectNext();
        }
      });

      signallers[idx = signallers.length] = sig;
    }

    t.plan(signallerCount);
    connectNext();
  });

  test('concurrent announce', function(t) {
    t.plan(signallers.length);

    signallers.forEach(function(sig) {
      var expected = signallers.map(pluck('id')).filter(function(id) {
        return id !== sig.id;
      });

      function handleAnnounce(data) {
        var idx = expected.indexOf(data.id);

        if (idx >= 0) {
          expected.splice(idx, 1);
        }

        if (expected.length === 0) {
          t.pass(sig.id + ' has received all expected ennounce messages');
          sig.removeListener('peer:announce', handleAnnounce);
        }
      }

      sig.on('peer:announce', handleAnnounce);
      sig.announce({ room: uuid });
    });
  });

  test('close the signallers', function(t) {
    t.plan(signallers.length);
    signallers.forEach(function(signaller, idx) {
      signaller.on('disconnected', t.pass.bind(t, 'signaller ' + idx + ' disconnected'));
      signaller.close();
    });
  });
};
