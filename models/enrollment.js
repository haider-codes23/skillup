const {DataTypes} = require("sequelize");
// returns an instance of Sequelize that we created to configure MYSQL
// Database with sequelize
const sequelize = require('../database');
const User = require("../models/user");
const Course = require("../models/course");

const Enrollment = sequelize.define("Enrollment", {
  enrollment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  enrollment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_complete: {
    type: DataTypes.TINYINT,
    allowNull: false
  }
  
}, {timestamps: false});

// Association between User and Enrollments
User.hasMany(Enrollment, {foreignKey: "user_id"});
Enrollment.belongsTo(User, {foreignKey: "user_id"});

// Association between Course and Enrollment
Course.hasMany(Enrollment, {foreignKey: "course_id"});
Enrollment.belongsTo(Course, {foreignKey: "course_id"});

module.exports = Enrollment;