var merge = require('webpack-merge')
var appSetting = require('./app.base.setting');
module.exports = merge(appSetting, {
  NODE_ENV: '"production"'
})
