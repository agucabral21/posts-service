const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responses');

const jwtValidationMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    const secret = process.env.PRIVATE_API_KEY;
    token = token.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(token, secret);
      req.user = decodedToken;
      next();
    } catch (e) {
      return res.status(401).json(errorResponse({ message: 'Not valid token' }));
    }
  } else {
    return res.status(401).json(errorResponse({ message: 'Authorization Token Required' }));
  }
};

module.exports = jwtValidationMiddleware;
