const Curso = require("../models/curso");
const Modulo = require("../models/modulo");

class ModuloService {
    static async create(moduloData) {
        const { cursoId } = moduloData;

        const curso = await Curso.findByPk(cursoId);

        if (!curso) {
            throw new Error("Curso não encontrado");
        }

        const modulo = await Modulo.create(moduloData);

        const moduloPlain = modulo.get({ plain: true });
        delete moduloPlain.createdAt;
        delete moduloPlain.updatedAt;

        return moduloPlain;
    }

    static async listAll() {
        const modulos = await Modulo.findAll({
            include: [
                {
                    model: Curso,
                    as: "curso",
                },
            ],
            order: [["ordem", "ASC"]],
        });

        return modulos.map(modulo => {
            const plain = modulo.get({ plain: true });
            delete plain.createdAt;
            delete plain.updatedAt;

            if (plain.curso) {
                delete plain.curso.createdAt;
                delete plain.curso.updatedAt;
            }

            return plain;
        });
    }

    static async getById(id) {
        const modulo = await Modulo.findByPk(id, {
            include: [
                {
                    model: Curso,
                    as: "curso",
                },
            ]
        });

        if (!modulo) {
            throw new Error("Módulo não encontrado");
        }

        const plain = modulo.get({ plain: true });
        delete plain.createdAt;
        delete plain.updatedAt;

        if (plain.curso) {
            delete plain.curso.createdAt;
            delete plain.curso.updatedAt;
        }

        return plain;
    }

    static async update(id, moduloData) {
        const modulo = await Modulo.findByPk(id);

        if (!modulo) return null;

        await modulo.update(moduloData);

        const plain = modulo.get({ plain: true });
        delete plain.createdAt;
        delete plain.updatedAt;

        return plain;
    }

    static async delete(id) {
        const modulo = await Modulo.findByPk(id);

        if (!modulo) return false;

        await modulo.destroy();

        return true;
    }
}

module.exports = ModuloService;