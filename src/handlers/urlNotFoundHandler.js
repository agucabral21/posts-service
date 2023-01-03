const { errorResponse } = require('../utils/responses');

const urlNotFoundHandler = (req, res) => {
  res
    .type('json')
    .status(404)
    .json(errorResponse({ message: `Can't find ${req.originalUrl} on this server!` }));
};

module.exports = urlNotFoundHandler;
