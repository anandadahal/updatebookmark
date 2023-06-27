const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "https://nepalinfo.itsoch.com/v1", // Specify the API endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://nepalinfo.itsoch.com', // Specify the target API URL
      changeOrigin: true, // Add the 'Origin' header to the request
      secure: false, // Allow connections to an SSL target without valid SSL certificate
    })
  );
};
