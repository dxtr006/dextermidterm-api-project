const request = require('supertest');
const server = require('./testSetup');
const assert = require('assert');

describe('User Routes', () => {
  after(done => {
    server.close(done);
  });

  it('should create a new user', async () => {
    const response = await request(server)
      .post('/api/users/register')
      .send({ username: `testuser${Date.now()}`, email: `testuser${Date.now()}@example.com`, password: 'testpassword' });
    console.log('Create User Response:', response.body);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.message, 'User registered.');
  });

  it('should login a user', async () => {
    const response = await request(server)
      .post('/api/users/login')
      .send({ usernameOrEmail: 'testuser', password: 'testpassword' });
    console.log('Login Response:', response.body);
    assert.strictEqual(response.status, 200);
    assert(response.body.hasOwnProperty('token'));
  });

  it('should get the user profile', async () => {
    const loginResponse = await request(server)
      .post('/api/users/login')
      .send({ usernameOrEmail: 'testuser', password: 'testpassword' });
    const token = loginResponse.body.token;
    console.log('Token:', token);

    const response = await request(server)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    console.log('Get Profile Response:', response.body);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.username, 'testuser');
  });
});