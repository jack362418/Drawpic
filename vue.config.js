'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9529 // dev port

module.exports = {
  publicPath: '/drawpic/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false
  },
  configureWebpack: {
    name: "图形工具",
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  }
}
