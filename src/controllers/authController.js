const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, Tenant, User } = require('../models');

const registerTenant = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { business_name, owner_name, email, password } = req.body;

    // 1. Validasi input
    if (!business_name || !owner_name || !email || !password) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Field business_name, owner_name, email, dan password wajib diisi',
      });
    }

    if (password.length < 6) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter',
      });
    }

    // 2. Cek email unik
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar, silakan gunakan email lain',
      });
    }

    // 3. Buat Tenant baru
    const tenant = await Tenant.create({ name: business_name }, { transaction: t });

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Buat User (role: owner)
    const user = await User.create({
      tenant_id: tenant.id,
      name: owner_name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'owner',
      is_active: true,
    }, { transaction: t });

    // 6. Commit transaksi
    await t.commit();

    // 7. Buat JWT token
    const token = jwt.sign(
      {
        user_id: user.id,
        tenant_id: tenant.id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // 8. Response 201
    return res.status(201).json({
      success: true,
      data: {
        tenant_id: tenant.id,
        user_id: user.id,
        token,
      },
      message: 'Registrasi berhasil',
    });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    next(error);
  }
};

module.exports = {
  registerTenant,
};
