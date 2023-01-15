const stream = require('node:stream');
var blessed = require('../src/lib/reblessed')
  , screen;

screen = blessed.screen({
  dump: __dirname + '/logs/textarea.log',
  fullUnicode: true,
  warnings: true
});

const customStream = new stream.Writable();

customStream.write("test");

var box = blessed.streambox({
  parent: screen,
  style: {
    bg: 'blue'
  },
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  tags: true,
  output: customStream,
});

screen.render();
