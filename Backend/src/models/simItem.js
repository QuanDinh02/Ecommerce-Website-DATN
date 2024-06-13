'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SimItem extends Model {
    static associate(models) {
      SimItem.belongsTo(models.Product, { foreignKey: 'item_id' });
      SimItem.belongsTo(models.Product, { foreignKey: 'item_rec' });
    }
  }
  SimItem.init({
    item_id: DataTypes.BIGINT,
    item_rec: DataTypes.BIGINT,
    score: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'SimItem',
  });
  return SimItem;
};