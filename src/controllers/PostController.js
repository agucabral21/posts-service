const PostService = require('../services/PostService');
const { okResponse, errorResponse } = require('../utils/responses');

class PostController {
  static async find(req, res, next) {
    const posts = await PostService.find({});
    if (!posts) {
      return res.status(404).json(errorResponse({ message: 'Post not found.' }));
    }
    return res.status(200).json(okResponse(posts));
  }

  static async findById(req, res, next) {
    const id = req.params.id;
    const post = await PostService.findById(id);
    if (!post) {
      return res.status(404).json(errorResponse({ message: 'Post not found.' }));
    }
    return res.status(200).json(okResponse(post));
  }

  static async create(req, res, next) {
    const { title, body } = req.body;
    const newPost = await PostService.create({ title, body });
    return res.status(201).send(okResponse(newPost));
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const { title, body } = req.body;
    const updatedPost = await PostService.update(id, { title, body });

    if (!updatedPost) {
      return res.status(404).json(errorResponse({ message: 'Post not found.' }));
    }
    return res.status(200).send(okResponse(updatedPost));
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    const deletePost = PostService.delete(id);
    return res.status(200).send(okResponse(deletePost));
  }
}

module.exports = PostController;
