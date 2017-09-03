module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    short: {
      type: DataTypes.STRING(200),
      defaultValue: "",
    },
    title: {
      type: DataTypes.STRING(200),
      defaultValue: "",
    },
    markdown: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    html: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    status: {
      type: DataTypes.INTEGER(8),
      defaultValue: 0
    }
  }, {
    tableName: 'gsc_post',
  });
  return Post;
};
