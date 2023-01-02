class BaseError extends Error {
  constructor(message, name = '', data = {}) {
    super(message);    
    this.name = name;
    this.data = data;
  }
}

module.exports = BaseError;
