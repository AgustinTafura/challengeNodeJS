'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TvShow)

      this.hasMany(models.Episode);
      // define association here
    }
  };
  Season.init({
    title: DataTypes.STRING,
    // tvshowId: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Season',
  });
  return Season;
};