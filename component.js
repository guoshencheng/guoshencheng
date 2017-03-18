var ejs = require('ejs');
var humps = require('humps');
var fs = require('fs')
var path = require('path')
var getDirName = path.dirname;
var mkdirp = require('mkdirp');
var pwd = process.cwd();
console.log(pwd)

const defaultConfig = {
  component: './react/components/'
}

var add = function(name) {
  var id = humps.decamelize(name, { separator: '_' })
  var template = ejs.compile(fs.readFileSync(path.resolve(__dirname, './templates/component.ejs'), 'utf-8'));
  var fileString = template({ name, id });
  fs.readFile(`${pwd}/reactp.config.json`, 'utf8', function (err, data) {
    if (err) {
      console.log(`can not find file at directory ${pwd}; use default config`);
    } else {
      console.log(`use file ${pwd}/reactp.config.json`);
    }
    var config = err ? defaultConfig : JSON.parse(data);
    var componentFilePath = `${config.component}${name}/index.jsx`;
    writeFile(componentFilePath, fileString, function(err, result) {
      console.log(err, result)
    });
  });
}

var operations = {
  add
}

var flagTest = /-/;
var flags = process.argv.filter(function(arg) {
  return flagTest.test(arg);
});
var argv = process.argv.filter(function(arg) {
  return !flagTest.test(arg)
});
console.log(argv, flags);
if (argv.length < 4) {
  console.log('arguments not enough')
  process.exit()
} else {
  if (operations[argv[2]]) {
    operations[argv[2]](argv[3])
  } else {
    console.log('arguments wrong')
    process.exit()
  }
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
      if (err) return cb(err);
      fs.writeFile(path, contents, cb);
    });
}

