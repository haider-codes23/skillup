const {DataTypes} = require('sequelize');
const sequelize = require('../database');

// define a course model

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    alloweNull: false
  },
  name: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  email: {
    type: DataTypes.STRING,
    alloweNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  role: {
    type: DataTypes.ENUM("Learner", "Instructor", "Admin"),
    alloweNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    alloweNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    alloweNull: true
  },
}, {timestamps: false});

module.exports = User;