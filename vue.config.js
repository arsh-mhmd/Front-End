module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.106.160.178:8088/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
    }
  },
}
1
