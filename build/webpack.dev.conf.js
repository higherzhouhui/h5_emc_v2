var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path');
var glob = require('glob');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  // },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
  ]
})

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(1, 1).toString().toLowerCase();
    entries[pathname] = entry;
  });

  return entries;
}

// module.exports.plugins.push(new HtmlWebpackPlugin({
//     filename: 'index.html',
//     template: 'src/localapp.html', // 模板路径
//     inject: true
// }));
var pages = getEntry('./src/*.html');

for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: 'index.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
    inject: true              // js插入位置
};
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
// var conf = {
//     filename: 'index.html',
//     template: './src/localapp.html', // 模板路径
//     // chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
//     inject: true              // js插入位置
//   };
// module.exports.plugins.push(new HtmlWebpackPlugin( conf));
