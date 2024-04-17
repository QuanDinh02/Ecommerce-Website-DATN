'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistrationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        RegistrationDetail.belongsTo(models.Registration, { foreignKey: 'RegistrationID' });
        RegistrationDetail.belongsTo(models.Policy, { foreignKey: 'PolicyID' });
    }
  }
  RegistrationDetail.init({
    PolicyID: DataTypes.INTEGER,
    RegistrationID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegistrationDetail',
  });
  return RegistrationDetail;
};