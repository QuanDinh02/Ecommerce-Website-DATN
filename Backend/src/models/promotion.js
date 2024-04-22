'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate(models) {
        Promotion.hasMany(models.PromotionUser, { foreignKey: 'promotionID' });
    }
  }
  Promotion.init({
    reducedCost: DataTypes.INTEGER,
    reducedTypeCost: DataTypes.SMALLINT,
    minCost: DataTypes.INTEGER,
    maxCost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    usedQuantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    typeDiscount: DataTypes.SMALLINT,
    createdByWeb: DataTypes.BOOLEAN,
    shopID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};