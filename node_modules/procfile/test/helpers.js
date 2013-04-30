/*
 * helpers.js: Test helpers for the procfile module
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */

var fs = require('fs'),
    path = require('path');

var fixtures = path.join(__dirname, 'fixtures'),
    files = [path.join(fixtures, 'ruby.procfile'), path.join(fixtures, 'node.procfile'), path.join(fixtures, 'newline.procfile')],
    procfiles = {};

var helpers = exports;

helpers.parsed = {};

helpers.readFixture = function (file) {
  try {
    var data = fs.readFileSync(file);
    data = data.toString();
    procfiles[path.basename(file, '.procfile')] = data;
  }
  catch (ex) {
    console.log('Error parsing procfiles: ' + ex.message);
    process.exit(1);
  }
};

helpers.readFixtures = function () {
  if (Object.keys(procfiles).length > 0) {
    return procfiles;
  }
  
  files.forEach(function (file) {
    helpers.readFixture(file);
  });
  
  return procfiles;
};

helpers.putParsed = function (name, procs) {
  helpers.parsed[name] = procs;
};
