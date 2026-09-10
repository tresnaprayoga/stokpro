const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tenant = sequelize.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  }
}, {
  tableName: 'tenants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Tenant;
