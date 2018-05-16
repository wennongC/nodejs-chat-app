var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var from = 'cwn';
    var text = 'Hello!';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(isNaN(res.createAt)).toBeFalsy();
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'cwn';
    var res = generateLocationMessage(from,1,1);
    expect(res.from).toBe(from);
    expect(res.url).toBe('https://www.google.com/maps?q=1,1');
    expect(isNaN(res.createAt)).toBeFalsy();
  });
});
