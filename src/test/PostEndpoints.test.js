const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });
const { db, app } = require('../config');
const Post = require('../models/Post');
const request = require('supertest');
var mongoose = require('mongoose');

const PostService = require('../services/PostService');

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

describe('Test for POST Endpoints.', () => {
  test('.create() -> should create post', async () => {
    let data = {
      title: 'test title',
      body: 'test body',
    };
    await request(app)
      .post(`/posts`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .send(data)
      .then(async (response) => {
        expect(response.statusCode).toBe(201);
        await request(app)
          .get(`/posts/${response.body.data._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.title).toBe(data.title);
          });
      });
  });
  test('.create() -> should throw BaseError for invalid post, not unique title', async () => {
    let data = {
      title: 'test title',
      body: 'test body',
    };
    let post1 = await Post.create(data);
    await request(app)
      .post(`/posts`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .send(data)
      .then(async (response) => {
        expect(response.statusCode).toBe(422);
        expect(response.body.error).toBe(true);
      });
  });
});

describe('Test for GET Endpoints.', () => {
  test('.get() -> should return all posts', async () => {
    let post1 = await Post.create({ title: 'test title 1', body: 'test body1' });
    let post2 = await Post.create({ title: 'test title 2', body: 'test body2' });
    await request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBe(2);
      });
    let post3 = await Post.create({ title: 'test title 3', body: 'test body3' });
    await request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBe(3);
      });
  });
  test('.get() -> should return false for no posts in find', async () => {
    await request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('No Post found.');
      });
  });

  test('.getById() -> should return post by id', async () => {
    let post = await Post.create({ title: 'test title 2', body: 'test body2' });
    await request(app)
      .get(`/posts/${post._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.title).toBe(post.title);
      });
  });
  test('.getById() -> should return null for not found id', async () => {
    let id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/posts/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('No Post found.');
      });
  });
});
describe('Test for DELETE Endpoints.', () => {
  test('.delete() -> should delete post by id', async () => {
    let post = await Post.create({ title: 'test title 1', body: 'test body1' });
    let post2 = await Post.create({ title: 'test title 2', body: 'test body2' });

    await request(app)
      .delete(`/posts/${post._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        await request(app)
          .get('/posts')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.length).toBe(1);
          });
      });
  });

  test('.delete() -> should return 401 because no role', async () => {
    let post = await Post.create({ title: 'test title 1', body: 'test body1' });
    let post2 = await Post.create({ title: 'test title 2', body: 'test body2' });

    await request(app)
      .delete(`/posts/${post._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
      .then(async (response) => {
        expect(response.statusCode).toBe(401);
      });
  });
});
describe('Test for PUT Endpoints.', () => {
  test('.update() -> should update post by id', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let dataUpdate = {
      title: 'test update',
      body: 'test body update',
    };
    let post = await Post.create(data);

    await request(app)
      .put(`/posts/${post._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .send(dataUpdate)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        await request(app)
          .get('/posts')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].title).toBe(dataUpdate.title);
            expect(response.body.data[0].body).toBe(dataUpdate.body);
          });
      });
  });
  test('.update() -> should throw error for unique title value', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let dataUpdate = {
      title: 'testUpdate',
      body: 'test body update',
    };
    let post = await Post.create(data);
    let post2 = await Post.create(dataUpdate);

    await request(app)
      .put(`/posts/${post._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
      .send(dataUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(422);
      });
  });
});
