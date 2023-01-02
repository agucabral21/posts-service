const { errorResponse } = require('../utils/responses');

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    console.log(err.data);

    let status = 500;
    let err_body = { message: err.message, data: err };

    if (err.name === 'mongodbError') {
      //if any mongo validation fail return 422
      if (err.data.name === 'ValidationError' || err.data.code === 11000) {
        status = 422;
        delete err_body.data;
      }
    }

    return res.status(status).json(errorResponse(err_body));
  });
};

module.exports = catchAsync;
