require('dotenv').config();

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: `http://localhost:${process.env.API_PORT}/` }));
};