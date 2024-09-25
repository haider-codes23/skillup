const {DataTypes} = require("sequelize");
const sequelize = require('../database');
const Course = require('../models/course');

const Lesson = sequelize.define('Lesson', {
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {timestamps: false});

// Association between Course and Lesson
Course.hasMany(Lesson, {foreignKey: "course_id"});
Lesson.belongsTo(Course, {foreignKey: "course_id"});

module.exports = Lesson;