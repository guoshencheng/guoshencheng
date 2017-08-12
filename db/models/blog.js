module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    short: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "",
    },
    markdown: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    tableName: 'gsc_blog',
  });
  return Blog;
};
