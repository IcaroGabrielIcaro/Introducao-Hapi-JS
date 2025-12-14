const { Model, DataTypes } = require('sequelize');
const Database = require('../utils/database');
const UserProfile = require('./userProfile')

class User extends Model {
    async checkPassword(password) {
        return password === this.password;
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
  }
);

User.hasOne(UserProfile, {
  as: 'userProfile',
  foreignKey: 'userId',
});

UserProfile.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
});

module.exports = User;