var boombox = require('boombox');
var test = boombox(require('tape'));
var uuid = require('uuid');
var signaller = require('rtc-signaller');

module.exports = function(uri, opts) {
  var signallers = [];
  var roomId = uuid.v4();

  test('create signaller:0', function(t) {
    t.plan(2);
    t.ok(signallers[0] = signaller(uri), 'created');
    signallers[0].once('init', t.pass.bind(t, 'initialized'));
  });

  test('create signaller:1', function(t) {
    t.plan(2);
    t.ok(signallers[1] = signaller(uri), 'created');
    signallers[1].once('init', t.pass.bind(t, 'initialized'));
  });

  test('concurrent announce via primus', function(t) {
    t.plan(5);

    signallers[1].on('peer:announce', function(data) {
      t.equal(data.name, 'Fred', 'signaller 0 announce captured by signaller 1');
      t.ok(signallers[1].peers.get(data.id), 'signaller 1 has noted relationship with signaller 0');
    });

    signallers[0].on('peer:announce', function(data) {
      // once peer:1 has processed peer:0 announce it will respond
      // if it is a new peer
      t.equal(data.id, signallers[1].id, 'signaller 1 has announced itself in response');
      t.ok(signallers[0].peers.get(data.id), 'signaller 0 has noted relationship with signaller 1');
    });

    setTimeout(function() {
      signallers[0].removeAllListeners();
      signallers[1].removeAllListeners();
      t.equal(t.assertCount, 4, 'four previous tests passed ok');
    }, 10000);

    // peer 0 initiates the announce process
    signallers[0].announce({ room: roomId, name: 'Fred' });
    signallers[1].announce({ room: roomId, name: 'Bob' });
  });

  test('ab roles have been correctly assigned', function(t) {
    var data0;
    var data1;

    t.plan(4);
    t.ok(data0 = signallers[1].peers.get(signallers[0].id), 'got data for peer 0');
    t.ok(data1 = signallers[0].peers.get(signallers[1].id), 'got data for peer 1');

    // ensure that data0 and data1 have inverse relationships for local and remote
    t.equal(data0.remote, data1.local, 'data 0 remote === data 1 local');
    t.equal(data1.local, data0.remote, 'data 1 local === data 0 remote');
  });

  test('isMaster checks are accurate', function(t) {
    var alphaId = [signallers[0].id, signallers[1].id].sort()[0];

    t.plan(2);

    if (alphaId === signallers[0].id) {
      t.ok(signallers[0].isMaster(signallers[1].id));
      t.notOk(signallers[1].isMaster(signallers[0].id));
    }
    else {
      t.notOk(signallers[0].isMaster(signallers[1].id));
      t.ok(signallers[1].isMaster(signallers[0].id));
    }
  });

  test('close the signallers', function(t) {
    t.plan(signallers.length);
    signallers.forEach(function(signaller, idx) {
      signaller.on('disconnected', t.pass.bind(t, 'signaller ' + idx + ' disconnected'));
      signaller.close();
    });
  });


};
