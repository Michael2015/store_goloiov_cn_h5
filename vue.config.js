const path = require('path')

module.exports = {
  productionSourceMap: true,
  filenameHashing: false,
  // publicPath: './',
  assetsDir: 'public/h5',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://storemp.golodata.com/',
        ws: true,
        changeOrigin: true
      },
      '/public/uploads/': {
        target: 'https://storemp.golodata.com/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'com': path.resolve(__dirname, './src/components'),
        'img': path.resolve(__dirname, './src/assets/img'),
        'css': path.resolve(__dirname, './src/assets/css'),
        'api': path.resolve(__dirname, './src/api'),
        'lib': path.resolve(__dirname, './src/lib'),
        'ui': path.resolve(__dirname, './src/components/base/ui'),
        'mixins': path.resolve(__dirname, './src/mixins'),
        'base': path.resolve(__dirname, './src/components/base')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => {
          // 修改它的选项...
          options.fallback = {
            loader: 'file-loader',
            options: {
              name: 'public/h5/img/[name].[hash:8].[ext]'
            }
          }
          return options
        })
  }
}
