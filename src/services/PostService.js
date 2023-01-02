const Post = require('../models/Post');
const BaseError = require('../errors/BaseError');

class PostService {
  static async find(filters = {}) {
    try {
      const posts = await Post.find(filters);
      if (posts.length > 0) {
        return posts;
      }
      return false;
    } catch (err) {
      throw new BaseError(err.message, 'mongodbError', err);
    }
  }

  static async findById(id) {
    try {
      const post = await Post.find({ _id: id });
      if (post.length == 1) {
        return post[0];
      }
      return false;
    } catch (err) {
      throw new BaseError(err.message, 'mongodbError', err);
    }
  }

  static async create(data) {
    try {
      const newPost = await Post.create(data);
      return newPost;
    } catch (err) {
      throw new BaseError(err.message, 'mongodbError', err);
    }
  }

  static async update(id, data) {
    try {
      const updatePost = await Post.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return updatePost;
    } catch (err) {
      throw new BaseError(err.message, 'mongodbError', err);
    }
  }

  static async delete(id) {
    try {
      const { acknowledged, ...deletePost } = await Post.deleteOne({ _id: id });
      return acknowledged;
    } catch (err) {
      throw new BaseError(err.message, 'mongodbError', err);
    }
  }
}

module.exports = PostService;
