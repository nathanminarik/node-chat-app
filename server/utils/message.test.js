var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Admin',
        text = 'Test Message'
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    // expect(message.from).toBe('Admin');
    expect(message).toInclude({from, text});
    
  });
});

describe('generateLocationMessage', () => {
  it('should create correct location object', () => {
    var latitude = 1,
        longitude = 1,
        from = 'Admin',
        message = generateLocationMessage(from, latitude, longitude);

    expect(message).toInclude({
      from,
      url: 'https://www.google.com/maps?q=1,1'
    });

    expect(message.createdAt).toBeA('number');
  });
});