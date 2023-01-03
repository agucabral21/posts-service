const router = require('express').Router();
const PostController = require('../../controllers/PostController');
const catchAsync = require('../../errors/catchAsync');
const { authMiddleware } = require('../../middlewares');

router.get('/', catchAsync(PostController.find));
router.post('/', catchAsync(PostController.create));

router.get('/:id', catchAsync(PostController.findById));
router.put('/:id', catchAsync(PostController.update));
router.delete('/:id', authMiddleware(['admin']), catchAsync(PostController.delete));

module.exports = router;
