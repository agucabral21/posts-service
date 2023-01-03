const { errorResponse } = require('../utils/responses');

const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    let authenticated = false;
    if (req.user?.roles) {
      const userRoles = req.user.roles;
      authenticated = !roles.some((r) => !userRoles.includes(r));
    }
    if (!authenticated) {
      return res.status(401).json(errorResponse({ message: 'Unauthorized' }));
    }
    return next();
  };

module.exports = authMiddleware;
