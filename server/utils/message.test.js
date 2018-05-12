var expect = require('expect');
var {generateMessage} = require('./message.js');

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
