module.exports = (sequelize, DataTypes) => {
  var Tip = sequelize.define("Tip", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tipText: {
      type: DataTypes.STRING(500),
      defaultValue: "",
      field: 'tip_text'
    },
    tipHtml: {
      type: DataTypes.TEXT,
      defaultValue: "",
      field: 'tip_html'
    }
  }, {
    tableName: 'gsc_tip',
  });
  return Tip;
};
