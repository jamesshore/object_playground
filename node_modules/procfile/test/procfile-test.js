/*
 * procfile-test.js: Procfile parser for node.js
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */
 
var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    async = require('async'),
    vows = require('vows'),
    procfile = require('../lib/procfile'),
    helpers = require('./helpers');

var procfiles = helpers.readFixtures();

vows.describe('procfile').addBatch({
  "When using the procfile module": {
    "the parse method": {
      "with a ruby-based procfile": function () {
        var procs = procfile.parse(procfiles.ruby);
        
        assert.isObject(procs.web);
        assert.isObject(procs.worker);
        Object.keys(procs).forEach(function (proc) {
          assert.isString(procs[proc].command);
          assert.isArray(procs[proc].options);
        });
        
        helpers.putParsed('ruby', procs);
      },
      "with a node-based procfile": function () {
        var procs = procfile.parse(procfiles.node);
        
        assert.isObject(procs.web);
        assert.isObject(procs.worker);
        Object.keys(procs).forEach(function (proc) {
          assert.isString(procs[proc].command);
          assert.isArray(procs[proc].options);
        });
        
        helpers.putParsed('node', procs);
      },
      "with newline at end of file": function() {
        assert.doesNotThrow(function() {
          var procs = procfile.parse(procfiles.newline);
        });
      }
    }
  }
}).addBatch({
  "When using the procfile module": {
    "the stringify method": {
      "with a ruby-based procfile": function () {
        var result = procfile.stringify(helpers.parsed['ruby']);
        assert.deepEqual(helpers.parsed['ruby'], procfile.parse(result));
      },
      "with a node-based procfile": function () {
        var result = procfile.stringify(helpers.parsed['node']);
        assert.deepEqual(helpers.parsed['node'], procfile.parse(result));        
      }
    }
  }
}).export(module);