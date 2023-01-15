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
  options.shrink = true;
  Element.call(this, options);

  this.program = options.program;

  if (!this.program) {
    this.program = program({
      input: options.input,
      output: options.output,
      log: options.log,
      debug: options.debug,
      dump: options.dump,
      terminal: options.terminal || options.term,
      resizeTimeout: options.resizeTimeout,
      forceUnicode: options.forceUnicode,
      tput: true,
      buffer: true,
      zero: true
    });
  } else {
    this.program.setupTput();
    this.program.useBuffer = true;
    this.program.zero = true;
    this.program.options.resizeTimeout = options.resizeTimeout;
    if (options.forceUnicode != null) {
      this.program.tput.features.unicode = options.forceUnicode;
      this.program.tput.unicode = options.forceUnicode;
    }
  }

  this.program.on('resize', function() {
    self.alloc();
    self.render();
    (function emit(el) {
      el.emit('resize');
      el.children.forEach(emit);
    })(self);
  });

  this.program.on('focus', function() {
    self.emit('focus');
  });

  this.program.on('blur', function() {
    self.emit('blur');
  });

  this.program.on('warning', function(text) {
    self.emit('warning', text);
  });
}

StreamBox.prototype.__proto__ = Element.prototype;

StreamBox.prototype.type = 'streambox';

/**
 * Expose
 */

module.exports = StreamBox;
