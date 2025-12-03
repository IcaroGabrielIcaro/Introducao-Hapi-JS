const { DataTypes, Model } = require('sequelize');
const Database = require('../config/Database');

class PerfilUsuario extends Model {}

PerfilUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    perfil: {
      type: DataTypes.ENUM('aluno', 'professor'),
      allowNull: false,
    },
  },
  {
    sequelize: Database.connection,
    tableName: 'perfil_usuarios',
    timestamps: false,
  }
);

module.exports = PerfilUsuario;
