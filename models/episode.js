'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Season);
      this.belongsToMany(models.Actor, { through: 'actors_movies' })
    }
  };
  Episode.init({
    title: DataTypes.STRING,
    // seasonId: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.DECIMAL,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episode',
  });
  return Episode;
};