module.exports = (sequelize, DataTypes) => {
  var PostTagMap = sequelize.define("PostTagMap", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'post_id'
    },
    postTagId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'post_tag_id'
    }
  }, {
    tableName: 'gsc_post_tag_map',
  });
  return PostTagMap;
};
