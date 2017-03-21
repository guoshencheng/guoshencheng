var ejs = require('ejs');
var humps = require('humps');
var fs = require('fs')
var path = require('path')
var getDirName = path.dirname;
var mkdirp = require('mkdirp');
var pwd = process.cwd();

console.log(pwd)

const defaultConfig = {
  component: './react/components/',
  view: './react/views/'
}

var FileGenerator = function(templateDir, out) {
  if (!defaultConfig[out])  {
    console.error(`use illegal key ${out}`);
    process.exit();
  }
  return function(data) {
    console.log("templateDir: " + templateDir);
    var template = ejs.compile(fs.readFileSync(templateDir, 'utf-8'));
    console.log(template, data);
    var fileString = template(data);
    fs.readFile(`${pwd}/reactp.config.json`, 'utf8', function (err, data) {
      var outPath
      if (err) {
        outPath = defaultConfig[out]
        console.log(`can not find file at directory ${pwd}; use default config`);
      } else {
        var config = JSON.parse(data);
        if (config[out]) {
          outPath = config[out];
          console.log(`use file ${pwd}/reactp.config.json`);
        } else {
          outPath = defaultConfig[out]
          console.log(`missing key ${out} at directory ${pwd}; use default config`);
        }
      }
      var componentFilePath = `${outPath}${name}/index.jsx`;
      writeFile(componentFilePath, fileString, function(err, result) {
        console.log(err, result)
      });
    });
  }
}

var Component = function() {
  this.add = function(name) {
    var id = humps.decamelize(name, { separator: '_' });
    var fileGenerator = FileGenerator(path.resolve(__dirname, './templates/component.ejs'), 'component');
    fileGenerator({ name, id });
  }
  this.operations = {
    add: this.add
  }
}

var View = function () {
  this.add = function(name) {
    var id = humps.decamelize(name, { separator: '_' });
    var fileGenerator = FileGenerator(path.resolve(__dirname, './templates/view.ejs'), 'view');
    fileGenerator({ name, id });
  }
  this.operations = {
    add: this.add
  }
}

var component = new Component();
var view = new View();

var targets = {
  component, view
}

var flagTest = /-/;
var flags = process.argv.filter(function(arg) {
  return flagTest.test(arg);
});
var argv = process.argv.filter(function(arg) {
  return !flagTest.test(arg)
});
console.log(argv, flags);
if (argv.length < 5) {
  console.log('arguments not enough')
  process.exit()
} else {
  var targetKey = argv[2];
  var operation = argv[3];
  var name = argv[4];
  if (targets[targetKey] && targets[targetKey].operations[operation]) {
    targets[targetKey] && targets[targetKey].operations[operation](name);
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

