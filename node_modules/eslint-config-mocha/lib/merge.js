'use strict';

var mergeWith = require('lodash.mergewith');

function customizer (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return Object.assign(srcValue, objValue);
}

module.exports = function merge (object, other) {
  return mergeWith(object, other, customizer);
};
