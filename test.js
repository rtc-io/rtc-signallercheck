var nopt = require('nopt');
var knownOpts = {
  server: String
};
var shorthands = {};

require('./index.js')(nopt(knownOpts, shorthands, process.argv, 2));

