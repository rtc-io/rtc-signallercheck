var boombox = require('boombox');
var test = boombox(require('tape'));
var uuid = require('uuid');
var signaller = require('rtc-signaller');
var times = require('whisk/times');

module.exports = function(uri, opts) {
  var signallers = [uri, uri];
  var roomId = uuid.v4();
  var count = (opts || {}).count || 4;

  test('create signallers', function(t) {
    t.plan(count);
    signallers = times(count).map(function() {
      return signaller(uri);
    });

    signallers.forEach(function(s, idx) {
      s.once('connected', t.pass.bind(t, 'signaller ' + idx + ' connected'));
    });
  });

  test('announce in room', function(t) {
    t.plan(signallers.length);

    signallers.forEach(function(s, idx) {
      var expected = signallers.map(function(peer) {
        return peer !== s && peer.id;
      }).filter(Boolean);

      function handleAnnounce(data) {
        var searchIdx = expected.indexOf(data.id);
        if (searchIdx >= 0) {
          expected.splice(searchIdx);
        }

        if (expected.length === 0) {
          t.pass('signaller ' + idx + ' known by all peers');
          s.off('peer:announce', handleAnnounce);
        }
      }

      s.on('peer:announce', handleAnnounce);
      s.announce({ room: roomId });
    });
  });

  test('send message from 0', function(t) {
    t.plan(signallers.length - 1);
    signallers.slice(1).forEach(function(s, idx) {
      s.once('data', function(parts) {
        t.ok(Array.isArray(parts) && parts.length === 1 && (parts[0] === 'hello'), 'signaller ' + idx + ' got hello data');
      });
    });

    signallers[0].send('hello');
  });

  test('send command from 0', function(t) {
    t.plan(signallers.length - 1);

    signallers.slice(1).forEach(function(s, idx) {
      s.once('hello', t.pass.bind(t, 'signaller ' + idx + ' received hello command'));
    });

    signallers[0].send('/hello');
  });

  test('close the signallers', function(t) {
    t.plan(signallers.length);
    signallers.forEach(function(signaller, idx) {
      signaller.on('disconnected', t.pass.bind(t, 'signaller ' + idx + ' disconnected'));
      signaller.close();
    });
  });


};
