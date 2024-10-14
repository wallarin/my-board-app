const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8090/api',
      changeOrigin: true,
      // logLevel: 'debug',
      // logger: console,
    })
  );

  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:8090/api2',  // localhost:8090 그대로 사용 가능, 필요시 다른 서버로 변경 가능
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};