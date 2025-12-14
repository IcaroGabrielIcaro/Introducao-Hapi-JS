const { Model, DataTypes } = require('sequelize');
const Database = require('../utils/database');
const Modulo = require('./modulo');

class Aula extends Model {}

Aula.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        duracao: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: 'Duração em minutos',
        },

        ordem: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize: Database.connection,
        tableName: 'aulas',
        defaultScope: {
            order: [['ordem', 'ASC']],
        },
    }
);

Aula.belongsTo(Modulo, {
    as: 'modulo',
    foreignKey: {
        name: 'moduloId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Modulo.hasMany(Aula, {
    as: 'aulas',
    foreignKey: 'moduloId',
});

module.exports = Aula;
