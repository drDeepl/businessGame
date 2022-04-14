module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://api.economic.fisting.tech/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}