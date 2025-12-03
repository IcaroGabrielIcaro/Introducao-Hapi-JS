const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const Database = require('../config/Database');
const PerfilUsuario = require('./PerfilUsuario');

class User extends Model {
  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: Database.connection,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// ✅ LIGAÇÕES (equivalente direto ao OneToOne do Django)
User.hasOne(PerfilUsuario, {
  as: 'perfilUsuario',
  foreignKey: 'userId', // será criado automaticamente no banco
});

PerfilUsuario.belongsTo(User, {
  as: 'usuario',
  foreignKey: 'userId', // será criado automaticamente no banco
});

module.exports = User;
