const { Model, DataTypes } = require('sequelize');
const Database = require('../utils/database');
const User = require('./User')

class Curso extends Model {}

Curso.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nome: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true,
        },

        descricao: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: Database.connection,
        tableName: 'cursos',
    }
);

Curso.belongsTo(User, {
    as: 'professor',
    foreignKey: {
        name: 'professorId',
        allowNull: false,
    },
    onDelete: 'RESTRICT',
});

User.hasMany(Curso, {
    as: 'cursos',
    foreignKey: 'professorId',
});

module.exports = Curso;