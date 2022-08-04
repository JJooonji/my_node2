'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'CASCADE' })
      // define association here
    }
  }
  Comment.init({
    commentId:{
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    nickName: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  },{
    timestamps: true
  })
  return Comment;
};