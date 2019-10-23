const path = require('path')

const assetsDir = 'public/h5'

class GenHeadAndBody {
  apply(compiler) {
    compiler.hooks.compilation.tap('GenHeadAndBody', function(compilation){
      // html-webpack-plugin 3.x
      if (compilation.hooks.htmlWebpackPluginAlterAssetTags) {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('GenHeadAndBody', function(data, cb) {
          const htmlWebpackPlugin = data.plugin
          if (htmlWebpackPlugin.createHtmlTag) {
            const head = data.head.map(tag => htmlWebpackPlugin.createHtmlTag(tag)).join('\r\n')
            const body = data.body.map(tag => htmlWebpackPlugin.createHtmlTag(tag)).join('\r\n')
            compilation.assets[assetsDir + '/head.html'] = {
              source: () => head,
              size: () => head.length
            }
            compilation.assets[assetsDir + '/body.html'] = {
              source: () => body,
              size: () => body.length
            }
          }
          cb(null, data)
        })
      }
    })
  }
}

module.exports = {
  productionSourceMap: true,
  filenameHashing: true,
  // publicPath: './',
  assetsDir: assetsDir,
  devServer: {
    proxy: {
      '/api|/app': {
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
    },
    plugins: [new GenHeadAndBody()]
  },
  chainWebpack: config => {
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //     .loader('url-loader')
    //     .tap(options => {
    //       // 修改它的选项...
    //       options.fallback = {
    //         loader: 'file-loader',
    //         options: {
    //           name: 'public/h5/img/[name].[hash:8].[ext]'
    //         }
    //       }
    //       return options
    //     })
  }
}
