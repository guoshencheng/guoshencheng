var config = require('config');
var Sequelize = require('Sequelize');
var path = require('path');
var fs = require('fs');
var db = {};
var mysql = config.mysql;

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  dialect: mysql.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true, //将所有驼峰命名的属性名转换为下划线连接命名的表命，当有设置field选项时，取field的值
    freezeTableName: true
  }
});
fs.readdirSync(path.resolve(__dirname, './models/')).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
}).forEach(function(file) {
  var model = sequelize['import']('./models/' + file);
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
