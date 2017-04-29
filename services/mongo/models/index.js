var path = require('path')
var fs = require('fs')
var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var indexFileRegExp = /index/
var files = fs.readdirSync(dir)
var models = files.filter(file => {
  return !indexFileRegExp.test(file) && jsFileRegExp.test(file)
}).reduce((pre, cur) => {
  var key = cur.replace(jsFileRegExp, '');
  return Object.assign({}, pre, {
    [key]: require('./' + cur)
  })
}, {})

module.exports = models;
