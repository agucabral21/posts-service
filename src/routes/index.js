const router = require('express').Router();
const urlNotFoundHandler = require('../handlers/urlNotFoundHandler');
const { jwtValidationMiddleware } = require('../middlewares');
//Set response Content-Type
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router.all('*', jwtValidationMiddleware);

//app.set('json spaces', 2);

//Defining rest api resources.
router.use('/posts', require('./Posts'));

// Response for every other route not specified
router.all('*', urlNotFoundHandler);

module.exports = router;
