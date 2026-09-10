const sequelize = require('../config/database');
const Tenant = require('./Tenant');
const User = require('./User');

// Relasi
Tenant.hasMany(User, { foreignKey: 'tenant_id', as: 'users' });
User.belongsTo(Tenant, { foreignKey: 'tenant_id', as: 'tenant' });

module.exports = {
  sequelize,
  Tenant,
  User,
};
