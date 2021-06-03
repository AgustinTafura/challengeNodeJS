'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      seasonId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'seasons',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      number: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episodes');
  }
};