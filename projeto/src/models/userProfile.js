const { Model, DataTypes } = require('sequelize');
const Database = require('../utils/database');

class UserProfile extends Model {}

UserProfile.init(
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
    tableName: 'users_profile',
    timestamps: false,
  }
);

module.exports = UserProfile;