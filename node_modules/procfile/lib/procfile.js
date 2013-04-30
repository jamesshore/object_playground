/*
 * procfile.js: Procfile parser for node.js
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */

var fs = require('fs'),
    path = require('path');
 
var procfile = exports;

//
// ### function read (file, callback)
// #### @file {string} Filename to read the procfile from
// #### @callback {function} Continuation to respond to when complete.
// Reads and parses the procfile from the specified `file`.
//
procfile.read = function (file, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      return callback(err);
    }
    
    try {
      var procs = procfile.parse(data.toString());
    }
    catch (ex) {
      return callback(ex);
    }
    
    callback(null, procs);
  });
};

//
// ### function parse (lines)
// #### @lines {string} Lines to parse procfile data from
// Parses the procfile contained in the specified `lines`.
//
procfile.parse = function (lines) {
  var procs = {};
  
  lines.split('\n').forEach(function (line) {
    if (line === '') return;
    var parts   = line.split(':'),
        details = parts[1].trim().split(' '),
        name    = parts[0];
    
    procs[name] = {
      command: details[0],
      options: details.slice(1)
    };
  });
  
  return procs;
};

//
// ### function stringify (procs)
// #### @procs {Object} Procs to stringify
// Stringifies the specified `procs` into the Procfile
// format. The `procs` conform to the following format:
//
//    {
//      web: {
//        command: 'node',
//        options: ['myapp.js', '-p', 80]
//      }
//    }
//
procfile.stringify = function (procs) {
  return Object.keys(procs).map(function (proc) {
    return [
      proc + ':',
      procs[proc].command
    ].concat(procs[proc].options || []).join(' ');
  }).join('\n');
};

//
// ### function write (file, procs, callback)
// #### @file {string} Filename to write the procs to.
// #### @procs {Object} Procs to write to file.
// #### @callback {function} Continuation to respond to when complete.
// Writes the `procs` to the `file` specified. 
//
procfile.write = function (file, procs, callback) {
  fs.writeFile(file, procfile.stringify(procs), callback);
};