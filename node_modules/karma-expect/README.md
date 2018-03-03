[karma](http://karma-runner.github.io)-[expect](https://github.com/Automattic/expect.js)
============

[![Dependency Status](https://img.shields.io/david/princed/karma-expect.svg)](https://david-dm.org/princed/karma-expect) [![NPM version](https://img.shields.io/npm/v/karma-expect.svg)](https://www.npmjs.com/package/karma-expect) [![NPM downloads](https://img.shields.io/npm/dt/karma-expect.svg)](https://www.npmjs.com/package/karma-expect) [![Travis CI](https://img.shields.io/travis/princed/karma-expect.svg)](https://travis-ci.org/princed/karma-expect)

Motivation
----------

You should use it only if you want run tests in **IE8 and lower**, otherwise consider [karma-chai-plugins](https://github.com/princed/karma-chai-plugins/), which provides more complete [Chai](http://chaijs.com/) assertions as well as additional plugins.

Installation
------------

Install the module from npm:

```sh
$ npm install karma-expect --save-dev
```

Add `expect` to the `frameworks` key in your Karma configuration:

```js
module.exports = function(karma) {
  karma.set({

    // frameworks to use
    frameworks: ['mocha', 'expect']

    // ...
  });
};
```


Usage
-----

Expect.js assertions are available in the tests:

```js
describe('karma tests with expect', function() {
  it('should expose expect method', function() {
    expect('foo').to.not.equal('bar');
  });
});
```
