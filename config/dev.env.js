var merge = require('webpack-merge')
// var prodEnv = require('./prod.env')
var appSetting = require('./app.base.setting');
module.exports = merge(appSetting, {
  NODE_ENV: '"development"'
})
