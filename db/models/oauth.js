module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("OAuth", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authId: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      field: 'auth_id'
    },
    authType: {
      type: DataTypes.STRING(200),
      defaultValue: "",
      field: 'auth_type'
    },
    refreshToken: {
      type: DataTypes.STRING(200),
      defaultValue: "",
      field: 'refresh_token'
    },
    accessToken: {
      type: DataTypes.STRING(200),
      defaultValue: "",
      field: 'access_token'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      field: 'user_id'
    }
  }, {
    tableName: 'gsc_oauth',
  });
  return Post;
};
