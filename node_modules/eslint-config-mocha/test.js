'use strict';

var merge = require('./lib/merge');
var defaults = Object.create(require('.'));

module.exports = merge(defaults, {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  plugins: ['mocha-only'],
  globals: {
    expect: true,
    sinon: true
  },
  rules: {
    'mocha-only/mocha-only': 'error',
    'import/namespace': 'off',
    'no-return-assign': 'off'
  }
});
