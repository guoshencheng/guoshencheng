module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("MockProject", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projectName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'project_name',
      defaultValue: "",
    },
    projectDescribe: {
      type: DataTypes.STRING(200),
      field: 'project_describe',
      defaultValue: "",
    },
    basePath: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'base_path'
    },
    ownerId: {
      type: DataTypes.INTEGER(11),
      field: 'owner_id'
    }
  }, {
    tableName: 'gsc_mock_project',
  });
  return Post;
};
