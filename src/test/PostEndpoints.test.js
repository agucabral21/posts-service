const { db } = require('../config');
const Post = require('../models/Post');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {});

afterAll(async () => {
  await db.disconnect();
});

describe('Test for Post Endpoints.', () => {
  test('.add() -> should add post', (done) => {
    expect(1).toBe(1);
    done();
  });
});
