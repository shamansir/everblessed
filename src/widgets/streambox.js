/**
 * streambox.js - stream box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/kenan238/reblessed
 */

/**
 * Modules
 */

var Node = require('./node');
var Element = require('./element');

/**
 * Stream Box
 */

function StreamBox(options) {
  if (!(this instanceof Node)) {
    return new StreamBox(options);
  }
  options = options || {};
  Element.call(this, options);
}

StreamBox.prototype.__proto__ = Element.prototype;

StreamBox.prototype.type = 'box';

/**
 * Expose
 */

module.exports = StreamBox;
// TODO: start development later today
