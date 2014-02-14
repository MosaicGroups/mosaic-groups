
/**
 * Module dependencies.
 */

var jade = require('../')
  , assert = require('assert')
  , fs = require('fs');

// Shortcut

function getError(str, options){
  try {
    jade.render(str, options);
  } catch (ex) {
    return ex;
  }
  throw new Error('Input was supposed to result in an error.');
}
function getFileError(name, options){
  try {
    jade.renderFile(name, options);
  } catch (ex) {
    return ex;
  }
  throw new Error('Input was supposed to result in an error.');
}


describe('error reporting', function () {
  describe('compile time errors', function () {
    describe('with no filename', function () {
      it('includes detail of where the error was thrown', function () {
        var err = getError('foo(')
        assert(/Jade:1/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a filename', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getError('foo(', {filename: 'test.jade'})
        assert(/test\.jade:1/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a layout without block declaration (syntax)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.layout.syntax.error.jade', {})
        assert(/[\\\/]layout.syntax.error.jade:2/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a layout without block declaration (locals)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.layout.locals.error.jade', {})
        assert(/[\\\/]layout.locals.error.jade:2/.test(err.message))
        assert(/undefined is not a function/.test(err.message))
      });
    });
    describe('with a include (syntax)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.include.syntax.error.jade', {})
        assert(/[\\\/]include.syntax.error.jade:2/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a include (locals)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.include.locals.error.jade', {})
        assert(/[\\\/]include.locals.error.jade:2/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a layout (without block) with an include (syntax)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.layout.with.include.syntax.error.jade', {})
        assert(/[\\\/]include.syntax.error.jade:2/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
    describe('with a layout (without block) with an include (locals)', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/compile.with.layout.with.include.locals.error.jade', {})
        assert(/[\\\/]include.locals.error.jade:2/.test(err.message))
        assert(/foo\(/.test(err.message))
      });
    });
  });
  describe('runtime errors', function () {
    describe('with no filename and `compileDebug` left undefined', function () {
      it('just reports the line number', function () {
        var sentinel = new Error('sentinel');
        var err = getError('-foo()', {foo: function () { throw sentinel; }})
        assert(/on line 1/.test(err.message))
      });
    });
    describe('with no filename and `compileDebug` set to `true`', function () {
      it('includes detail of where the error was thrown', function () {
        var sentinel = new Error('sentinel');
        var err = getError('-foo()', {foo: function () { throw sentinel; }, compileDebug: true})
        assert(/Jade:1/.test(err.message))
        assert(/-foo\(\)/.test(err.message))
      });
    });
    describe('with a filename that does not correspond to a real file and `compileDebug` left undefined', function () {
      it('just reports the line number', function () {
        var sentinel = new Error('sentinel');
        var err = getError('-foo()', {foo: function () { throw sentinel; }, filename: 'fake.jade'})
        assert(/on line 1/.test(err.message))
      });
    });
    describe('with a filename that corresponds to a real file and `compileDebug` left undefined', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var sentinel = new Error('sentinel');
        var path = __dirname + '/fixtures/runtime.error.jade'
        var err = getError(fs.readFileSync(path, 'utf8'), {foo: function () { throw sentinel; }, filename: path})
        assert(/fixtures[\\\/]runtime\.error\.jade:1/.test(err.message))
        assert(/-foo\(\)/.test(err.message))
      });
    });
    describe('in a mixin', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/runtime.with.mixin.error.jade', {})
        assert(/mixin.error.jade:2/.test(err.message))
        assert(/Cannot read property 'length' of null/.test(err.message))
      });
    });
    describe('in a layout', function () {
      it('includes detail of where the error was thrown including the filename', function () {
        var err = getFileError(__dirname + '/fixtures/runtime.layout.error.jade', {})
        assert(/layout.with.runtime.error.jade:3/.test(err.message))
        assert(/Cannot read property 'length' of undefined/.test(err.message))
      });
    });
  });
  describe('deprecated features', function () {
    it('deprecates `!!!` in favour of `doctype`', function () {
      var err = getError('!!! 5', {filename: 'test.jade'})
      assert(/test\.jade:1/.test(err.message))
      assert(/`!!!` is deprecated, you must now use `doctype`/.test(err.message))
    });
    it('deprecates `doctype 5` in favour of `doctype html`', function () {
      var err = getError('doctype 5', {filename: 'test.jade'})
      assert(/test\.jade:1/.test(err.message))
      assert(/`doctype 5` is deprecated, you must now use `doctype html`/.test(err.message))
    });
  });
});
