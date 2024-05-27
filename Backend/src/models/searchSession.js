'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SearchSession extends Model {
    static associate(models) {
        SearchSession.belongsTo(models.Session, { foreignKey: 'sessionID' });
    }
  }
  SearchSession.init({
    sessionID: DataTypes.BIGINT,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'SearchSession',
  });
  return SearchSession;
};