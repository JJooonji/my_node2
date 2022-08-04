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
      User.hasMany(models.Content, { foreignKey: "userId", sourceKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Comment, {foreignKey: "userId", sourceKey: "userId", onDelete: "CASCADE"})
    }
  }
  User.init({
    userId:{
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    nickName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  },{
    timestamps: false
  })
  return User;
};