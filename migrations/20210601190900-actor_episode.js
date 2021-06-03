'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Actors_Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'actors',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      episodeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'episodes',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Actors_Episodes');
  }
};
