const router = require('express').Router();
const  urlNotFoundHandler  = require('../handlers/urlNotFoundHandler');

//Set response Content-Type
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

//app.set('json spaces', 2);

//Defining rest api resources.
router.use('/posts', require('./Posts'));

// Response for every other route not specified
router.all('*', urlNotFoundHandler);

module.exports = router;
 