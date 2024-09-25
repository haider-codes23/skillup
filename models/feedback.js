const {DataTypes} = require("sequelize");
const sequelize = require('../database');
const User = require('../models/user');
const Course = require("../models/course");

const Feedback = sequelize.define('Feedback', {
  feedback_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {timestamps: false});

// Association between User and Feedback
User.hasMany(Feedback);
Feedback.belongsTo(User);

// Association between Course and Feedback
Course.hasMany(Feedback, {foreignKey: "course_id"});
Feedback.belongsTo(Course, {foreignKey: "course_id"});

module.exports = Feedback;