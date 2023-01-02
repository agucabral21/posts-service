const { errorResponse } = require('../utils/responses');

const urlNotFoundHandler = (req, res) => {
  res
    .type('json')
    .status(404)
    .send(errorResponse(`Can't find ${req.originalUrl} on this server!`));
};

module.exports = urlNotFoundHandler;
