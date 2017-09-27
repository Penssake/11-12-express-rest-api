'use strict';

module.exports = (request, response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
};
