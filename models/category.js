const {DataTypes} = require("sequelize");
const sequelize = require('../database');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: false});

module.exports = Category;