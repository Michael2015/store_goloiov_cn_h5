const path = require('path')

const assetsDir = 'public/h5'

 // 线上地址
const url = 'https://wcp.wanchepin.com/' 
// 测试地址
//const url = 'https://storemp.golodata.com/'

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
  // publicPath: './public',
  assetsDir,
  devServer: {
    proxy: {
      '/api|/app': {
        target: url,
        ws: true,
        changeOrigin: true
      },
      '/public/uploads/': {
        target: url,
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
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
    module: {
      rules: [
        {
          test: /mini\.png$/, // 分享小程序封面图
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024 * 1024 * 4,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'public/h5/img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [new GenHeadAndBody()]
  },
  chainWebpack: config => {
    // 排除小程序封面图，让它被上面的loader捕获
    config.module.rule('images').exclude.add(/mini\.png$/)
  }
}
