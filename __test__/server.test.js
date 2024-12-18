const request = require('supertest');
const app = require('../src/server/index');

describe('GET /test', () => {
    it('should return a message with status 200', async () => {
      const response = await request(app).get('/test');
      expect(response.status).toBe(200);
    });
  });