const request = require('supertest');
const { app } = require('../config');

describe('Test status endpoint.', () => {
  test('It should show service status.', (done) => {
    request(app)
      .get('/wrongUrl')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
