const dbConfig = require("../config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const OpenBKBdb = {};

OpenBKBdb.Sequelize = Sequelize;
OpenBKBdb.sequelize = sequelize;

OpenBKBdb.bots = require("./botModel.js")(sequelize, Sequelize);
OpenBKBdb.ficdocs = require("./ficDocModel.js")(sequelize, Sequelize);

module.exports = OpenBKBdb;