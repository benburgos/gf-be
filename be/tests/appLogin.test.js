const { loginAppUser } = require('../controllers/app/login');

describe('loginAppUser', () => {
  it('should return a token if the password is correct', async () => {
    const req = {
      body: {
        email: 'user@example.com',
        password: 'user123',
      },
    };
    const res = {
      json: jest.fn(),
    };

    // Mock the checkHash function
    const mockCheckHash = jest
      .fn()
      .mockResolvedValue({ id: 'user123', key: 'userKey' });

    // Call the loginAppUser function
    await loginAppUser(req, res, mockCheckHash);

    // Verify that the response is correct
    expect(res.json).toHaveBeenCalledWith({
      token: 'generatedToken',
      key: 'userKey',
    });
  });

  it('should return a message if the password is incorrect', async () => {
    const req = {
      body: {
        email: 'user@example.com',
        password: 'wrongPassword',
      },
    };
    const res = {
      send: jest.fn(),
    };

    // Mock the checkHash function
    const mockCheckHash = jest.fn().mockResolvedValue(null);

    // Call the loginAppUser function
    await loginAppUser(req, res, mockCheckHash);

    // Verify that the response is correct
    expect(res.send).toHaveBeenCalledWith('Incorrect Password.');
  });
});
