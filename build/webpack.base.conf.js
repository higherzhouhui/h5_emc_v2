var path = require('path')
var utils = require('./utils')
var config = require('../config')

var webpack = require('webpack')

var vueLoaderConfig = require('./vue-loader.conf')

var glob = require('glob');
var entries = getEntry('./src/main.js'); // 获得入口js文件

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: ()=>{
        return [require('autoprefixer')({
          browsers: [
            'last 3 versions',
            'ie >= 10',
            'ie_mob >= 10',
            'chrome >= 34',
            'safari >= 6',
            'opera >= 12.1',
            'ios >= 6',
            'android >= 4.1'
          ]
        })
      ]
    }
  }
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(1, 1).toString().toLowerCase(); // 正确输出js和html的路径
    entries[pathname] = entry;
  });
//  console.log(resolve("/src/"));
  return entries;
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: entries,
  // entry: {
  //   app: './src/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.css','.sass','.scss'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'assets': path.resolve(__dirname, './../src/assets'),
      '@': resolve('src'),
      // 'swiper': 'swiper/dist/js/swiper.js'
    }
  },
  externals: {
    'AMap': 'AMap'
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssLoader],
        //打包时需要打开
        include:  process.env.NODE_ENV === 'production'
                ? "/node_modules/"
                : [resolve("/node_modules/")],
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 50000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
          'sass-loader'
        ],
        // include:[resolve("src/style/")],
        include: process.env.NODE_ENV === 'production'
                ? "/src/style/"
                : [resolve("src/style/")],
        exclude: "/node_modules/"
      }
    ]
  }
}
