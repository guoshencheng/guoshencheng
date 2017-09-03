'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable( 'gsc_post',
      { id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        }, short: {
          type: Sequelize.STRING(200),
          defaultValue: "",
        }, title: {
          type: Sequelize.STRING(200),
          defaultValue: "",
        }, markdown: {
          type: Sequelize.TEXT,
          allowNull: true
        }, html: {
          type: Sequelize.TEXT,
          allowNull: true
        }, status: {
          type: Sequelize.INTEGER(8),
          defaultValue: 0
        }, created_at: {
          type: Sequelize.DATE
        }, updated_at: {
          type: Sequelize.DATE
        }
      }
    ),
    {
      charset: 'utf8',
    }
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('gsc_post')
  }
};
