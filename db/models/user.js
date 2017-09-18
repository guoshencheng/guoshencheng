module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    power: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING(200),
      defaultValue: "",
    },
    nickname: {
      type: DataTypes.STRING(200),
      defaultValue: "",
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING(200),
      defaultValue: "",
    }
  }, {
    tableName: 'gsc_user',
  });
  return Post;
};
