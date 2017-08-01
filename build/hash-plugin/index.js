var path = require('path');
var fs = require('fs');
var cwd = process.cwd();
var mkdirp = require('mkdirp');
var ejs = require('ejs');
var template = ejs.compile(fs.readFileSync(path.resolve(__dirname, "./template.ejs"), 'utf-8'));
module.exports = function(options) {
  options = options || {}
  var pathname = options.path || path.resolve(cwd, "./")
  var filename = options.filename || "common.ejs";
  return function() {
    this.plugin('done', function(stats) {
      mkdirp(pathname, function(err) {
        if(err) {
          console.log(err);
        } else {
          var fileString = template({
            hash: stats.hash
          });
          fs.writeFileSync(path.join(pathname, "./" + filename), fileString);
        }
      })
    });
  }
}

