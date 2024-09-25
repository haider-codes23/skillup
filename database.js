const {Sequelize} = require('sequelize');
const config = require('config');

// Create a new Sequelize instance for MYSQL connection

const sequelize = new Sequelize(
  config.get('database'),
  config.get("username"),
  config.get("password"),
  {
    host: config.get("host"),
    port: config.get("port"),
    dialect: config.get("dialect"),
    logging: console.log
  }
);

// TestDB connection
sequelize.authenticate()
  .then(() => console.log("Conneted to MYSQL Database"))
  .catch(error => console.log(error));

module.exports = sequelize;