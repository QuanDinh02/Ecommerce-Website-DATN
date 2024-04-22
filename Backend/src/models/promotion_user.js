'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionUser extends Model {
    static associate(models) {
        PromotionUser.belongsTo(models.User, { foreignKey: 'userID' });
        PromotionUser.belongsTo(models.Promotion, { foreignKey: 'promotionID' });
    }
  }
  PromotionUser.init({
    userID: DataTypes.BIGINT,
    promotionID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'PromotionUser',
  });
  return PromotionUser;
};