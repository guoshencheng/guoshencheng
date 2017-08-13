'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('gsc_blog', 'gsc_post')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('gsc_post', 'gsc_blog')
  }
};
