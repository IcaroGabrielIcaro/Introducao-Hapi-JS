const { Model, DataTypes } = require("sequelize");
const Database = require("../utils/database");
const Curso = require("./curso");

class Modulo extends Model {}

Modulo.init(
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

        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
    },
    {
        sequelize: Database.connection,
        tableName: "modulos",

        indexes: [
            {
                unique: true,
                fields: ["cursoId", "ordem"]
            }
        ],

        defaultScope: {
            order: [["ordem", "ASC"]],
        }
    }
);

Modulo.belongsTo(Curso, {
    as: "curso",
    foreignKey: {
        name: "cursoId",
        allowNull: false,
    },
    onDelete: "CASCADE",
});

Curso.hasMany(Modulo, {
    as: "modulos",
    foreignKey: "cursoId",
});

module.exports = Modulo;
