const errorResponse = ({ data = {}, message }) => {
  return {
    error: true,
    message,
    data,
  };
};

const okResponse = (data, message) => {
  return {
    error: false,
    data,
    message,
  };
};

module.exports = { okResponse, errorResponse };
