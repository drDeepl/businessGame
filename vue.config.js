module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // before: https://api.economic.fisting.tech/api
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
