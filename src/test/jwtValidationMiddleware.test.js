const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });
const request = require('supertest');
const { app, db } = require('../config');
const Post = require('../models/Post');

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await Post.deleteMany({});
});

afterAll(async () => {
  await Post.deleteMany({});
  await db.disconnect();
});

const malformedToken = 'asdasd';

describe('Test authorization.', () => {
  test('It should show unauthenticated because malformed token.', (done) => {
    request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${malformedToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  test('It should show unauthenticated because empty token.', (done) => {
    request(app)
      .get('/posts')
      .set('Authorization', '')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});
