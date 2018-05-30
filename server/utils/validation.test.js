const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString Function', () => {
  it('should reject non-string value', () => {
    var number = 23333;
    expect(isRealString(number)).toBeFalsy();
  });

  it('should reject string with only space', () => {
    var spaceStr = '       ';
    expect(isRealString(spaceStr)).toBeFalsy();
  });

  it('should allow string with non-space character', () => {
    var char = 'C';
    expect(isRealString(char)).toBe(true);
  });
});
