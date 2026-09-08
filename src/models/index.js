const sequelize = require('../config/database');
const Tenant = require('./tenant');

const db = {
  sequelize,
  Tenant,
};

module.exports = db;
