const request = require('supertest');
const { app } = require('./app');

let token;

beforeAll(async () => {
  const response = await request(app).post('/api/login').send({
    username: 'stasik',
    password: 'youvan'
  });
  token = response.body.data.accessToken;
});
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('GET /api/news', () => {
  it('should require authorization', async () => {
    const response = await request(app).get('/api/news');

    expect(response.statusCode).toBe(401);
  });
  it('responds with JSON', async () => {
    const response = await request(app)
      .get('/api/news')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
  });
});
