var expect = require('expect');
var { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var str = 123
    expect(isRealString(str)).toBe(false);
  });

  it('should reject strong with only spaces', () => {
    var str = "    ";
    expect(isRealString(str)).toBe(false);
  });

  it('should allow strings with non-space characters and', () => {
    var str = "  Hello   ";
    expect(isRealString(str)).toBe(true);
  });
});