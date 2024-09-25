const {DataTypes} = require("sequelize");
const sequelize = require('../database');

const Instructor = sequelize.define('Instructor', {
  instructor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {timestamps: false});

module.exports = Instructor;