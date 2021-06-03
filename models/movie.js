'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Genre);
      this.belongsTo(models.Director);

      this.belongsToMany(models.Actor, { through: 'actors_movies' })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    awards: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    length: DataTypes.SMALLINT,
    revenue: DataTypes.INTEGER,
    // genreId: DataTypes.INTEGER,
    // directorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
