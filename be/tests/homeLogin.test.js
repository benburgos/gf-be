const { loginUser } = require('../controllers/login');

describe('loginUser', () => {
  it('should return a token if the user is an admin and the password is correct', async () => {
    const req = {
      body: {
        email: 'admin@example.com',
        password: 'admin123',
      },
    };
    const res = {
      json: jest.fn(),
    };

    // Mock the checkHash and Brand.findOne functions
    const mockCheckHash = jest
      .fn()
      .mockResolvedValue({ id: 'admin123', key: 'adminKey' });
    const mockBrandFindOne = jest.fn().mockResolvedValue(true);

    // Call the loginUser function
    await loginUser(req, res, mockCheckHash, mockBrandFindOne);

    // Verify that the response is correct
    expect(res.json).toHaveBeenCalledWith({
      token: 'generatedToken',
      key: 'adminKey',
    });
  });

  it('should return a message if the user is not an admin but the password is correct', async () => {
    const req = {
      body: {
        email: 'user@example.com',
        password: 'user123',
      },
    };
    const res = {
      send: jest.fn(),
    };

    // Mock the checkHash and Brand.findOne functions
    const mockCheckHash = jest
      .fn()
      .mockResolvedValue({ id: 'user123', key: 'userKey' });
    const mockBrandFindOne = jest.fn().mockResolvedValue(false);

    // Call the loginUser function
    await loginUser(req, res, mockCheckHash, mockBrandFindOne);

    // Verify that the response is correct
    expect(res.send).toHaveBeenCalledWith(
      'Use the app login page to access the app.'
    );
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

    // Call the loginUser function
    await loginUser(req, res, mockCheckHash);

    // Verify that the response is correct
    expect(res.send).toHaveBeenCalledWith('Incorrect Password.');
  });
});
