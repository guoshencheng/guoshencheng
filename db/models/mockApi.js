
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("MockApi", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    apiMethod: {
      type: DataTypes.INTEGER(8),
      field: 'api_method',
      defaultValue: 0,
      allowNull: false,
    },
    apiPath: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'api_path',
      defaultValue: "",
    },
    apiDescribe: {
      type: DataTypes.STRING(200),
      field: 'api_describe',
      defaultValue: "",
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      field: 'project_id'
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    tableName: 'gsc_mock_api',
  });
  return Post;
};
