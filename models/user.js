'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      allowNull:false,
      type:DataTypes.STRING,
      // unique: { msg: 'Email address already in use!' },
      validate: {
        isEmail: true,
        async isUnique(value) {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error('Username already exists!');
          }
        },
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [3,200]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });



  return User;
};