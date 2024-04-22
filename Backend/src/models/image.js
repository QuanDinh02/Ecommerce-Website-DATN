'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.Product, { foreignKey: 'productID' });
            Image.belongsTo(models.ProductType, { foreignKey: 'productTypeID' });
            Image.belongsTo(models.ProductReview, { foreignKey: 'productReviewID' });
        }
    }
    Image.init({
        productID: DataTypes.BIGINT,
        productTypeID: DataTypes.BIGINT,
        productReviewID: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};