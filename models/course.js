const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Category = require('../models/category');

// define a course model

const Course = sequelize.define("Course", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    alloweNull: false
  },
  title: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  description: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  category: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    alloweNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    alloweNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    alloweNull: true
  }
}, {timestamps: false});

// Association between Category and Course
Category.hasMany(Course, {foreignKey: "category_id"});
Course.belongsTo(Category, {foreignKey: "category_id"});

module.exports = Course;