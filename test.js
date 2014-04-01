var nopt = require('nopt');
var url = require('url');
var knownOpts = {
  uri: url
};
var shorthands = {};

require('./index.js')(nopt(knownOpts, shorthands, process.argv, 2));

