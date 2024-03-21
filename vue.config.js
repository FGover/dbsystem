const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 打包路径
  publicPath: './',
  // 跨域代理
  // devServer: {
  //   proxy: 'http://127.0.0.1:90/api/'
  // }
})
