'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TvShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Genre)
      this.hasMany(models.Season);
    }
  };
  TvShow.init({
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    // genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TvShow',
  });
  return TvShow;
};