const router = require('express').Router();
const PostController = require('../../controllers/PostController');
const catchAsync = require('../../errors/catchAsync');

router.get('/', catchAsync(PostController.find));
router.post('/', catchAsync(PostController.create));

router.get('/:id', catchAsync(PostController.findById));
router.put('/:id', catchAsync(PostController.update));
router.delete('/:id', catchAsync(PostController.delete));

module.exports = router;
