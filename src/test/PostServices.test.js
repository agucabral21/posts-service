const { db } = require('../config');
const Post = require('../models/Post');
const PostService = require('../services/PostService');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

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

describe('Test for createPost Service.', () => {
  test('.create() -> should create post', async () => {
    let data = {
      title: 'test title',
      body: 'test body',
    };
    const createPost = await PostService.create(data);
    expect(createPost).toBeTruthy();
    let findPost = await Post.findOne({ _id: createPost._id });
    expect(findPost.title).toBe(data.title);
  });

  test('.create() -> should throw BaseError for invalid post, not unique title', async () => {
    let data = {
      title: 'test title',
      body: 'test body',
    };
    const createPost = await PostService.create(data);
    expect(createPost).toBeTruthy();
    let findPost = await Post.findOne({ _id: createPost._id });
    expect(findPost.title).toBe(data.title);
    try {
      const createPost = await PostService.create(data);
    } catch (err) {
      expect(err.name).toBe('mongodbError');
      expect(err.data.code).toBe(11000);
    }
  });
});
describe('Test for getPost Service.', () => {
  test('.get() -> should return all posts', async () => {
    let post1 = await Post.create({ title: 'test title 1', body: 'test body1' });
    let post2 = await Post.create({ title: 'test title 2', body: 'test body2' });

    let result = await PostService.find();
    expect(result.length).toBe(2);
    let post3 = await Post.create({ title: 'test title 3', body: 'test body3' });

    result = await PostService.find();
    expect(result.length).toBe(3);
  });

  test('.get() -> should return false for no posts in find', async () => {
    result = await PostService.find();
    expect(result).toBe(false);
  });
});
describe('Test for getPostById Service.', () => {
  test('.getById() -> should return post by id', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let post = await Post.create(data);
    let result = await PostService.findById(post._id);
    expect(result).toBeTruthy();
    expect(result.title).toBe(data.title);
  });

  test('.getById() -> should return null for not found id', async () => {
    let id = new mongoose.Types.ObjectId();
    let result = await PostService.findById(id);
    expect(result).toBeFalsy();
  });
});

describe('Test for deletePost Service.', () => {
  test('.delete() -> should delete post by id', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let post = await Post.create(data);
    let find = await PostService.find();
    expect(find.length).toBe(1);
    let deletePost = await PostService.delete(post._id);
    expect(deletePost).toBe(true);
    find = await PostService.find();
    expect(find).toBe(false);
  });
});

describe('Test for updatePost Service.', () => {
  test('.update() -> should update post by id', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let updateData = {
      title: 'test updated',
      body: 'test body updated',
    };
    let post = await Post.create(data);
    let find = await PostService.find();

    expect(find.length).toBe(1);
    expect(find[0].title).toBe(data.title);

    let update = await PostService.update({ _id: post._id }, updateData);

    expect(update).toBeTruthy();
    expect(update.title).toBe(updateData.title);
  });

  test('.update() -> should throw error for unique restriction in title', async () => {
    let data = {
      title: 'test ',
      body: 'test body',
    };
    let updateData = {
      title: 'test two',
      body: 'test body updated',
    };
    let post = await Post.create(data);
    let post2 = await Post.create(updateData);
    let find = await PostService.find();

    expect(find.length).toBe(2);
    expect(find[0].title).toBe(data.title);
    try {
      let update = await PostService.update({ _id: post._id }, updateData);
    } catch (err) {
      expect(err.name).toBe('mongodbError');
      expect(err.data.codeName).toBe('DuplicateKey');
    }
  });
});
