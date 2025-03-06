'use strict';

var merge = require('./lib/merge');
var defaults = Object.create(require('.'));

module.exports = merge(defaults, {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    strict: [
      'error',
      'never'
    ]
  },
  plugins: ['import'],
  extends: [
    'standard',
    'plugin:import/warnings'
  ]
});
