'use strict';

require('mocha');
var assert = require('assert');
var questions = require('base-questions');
var project = require('base-project');
var store = require('base-store');
var task = require('base-task');
var data = require('base-data');
var cwd = require('base-cwd');
var Base = require('base');
var prompts = require('./');
var app, prompt;

describe('base-task-prompts', function() {
  this.timeout(20000);

  beforeEach(function() {
    app = new Base();
    app.use(data());
    app.use(store());
    app.use(questions());
    app.use(task());
    prompt = prompts(app);
  });

  describe('utils', function() {
    it('should export a function', function() {
      assert.equal(typeof prompts, 'function');
    });

    it('should expose an object', function() {
      assert(prompt);
      assert.equal(typeof prompt, 'object');
    });

    it('should expose a .confirm method', function() {
      assert.equal(typeof prompt.confirm, 'function');
    });
  });

  describe('confirm', function() {
    it('should run task a or b', function(cb) {
      var count = 0;
      app.task('a', function(next) {
        count++;
        next();
      });
      app.task('b', function(next) {
        count++;
        next();
      });

      app.task('default', prompt.confirm('foo', ['a'], ['b']));
      app.build(function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });
});
