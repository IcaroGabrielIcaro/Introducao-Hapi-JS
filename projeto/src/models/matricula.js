const { Model, DataTypes } = require('sequelize');
const Database = require('../utils/database');
const User = require('./user');
const Curso = require('./curso');

class Matricula extends Model {}

Matricula.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    dataMatricula: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: Database.connection,
    tableName: 'matriculas',

    indexes: [
      {
        unique: true,
        fields: ['alunoId', 'cursoId'],
      },
    ],
  }
);

Matricula.belongsTo(User, {
  as: 'aluno',
  foreignKey: {
    name: 'alunoId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

User.hasMany(Matricula, {
  as: 'matriculas',
  foreignKey: 'alunoId',
});

Matricula.belongsTo(Curso, {
  as: 'curso',
  foreignKey: {
    name: 'cursoId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Curso.hasMany(Matricula, {
  as: 'matriculas',
  foreignKey: 'cursoId',
});

module.exports = Matricula;
