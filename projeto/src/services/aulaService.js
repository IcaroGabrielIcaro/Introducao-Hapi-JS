const Modulo = require("../models/modulo");
const Curso = require("../models/curso");
const Aula = require("../models/aula");

class AulaService {
    // ----------------------
    // CREATE
    // ----------------------
    static async create(aulaData) {
        const { moduloId } = aulaData;

        const modulo = await Modulo.findByPk(moduloId, {
            include: [
                {
                    model: Curso,
                    as: 'curso',
                }
            ]
        });

        if (!modulo) {
            throw new Error("Módulo não encontrado.");
        }

        if (!modulo.curso) {
            throw new Error("Módulo não está associado a um curso.");
        }

        const aula = await Aula.create(aulaData);

        const plain = aula.get({ plain: true });

        delete plain.createdAt;
        delete plain.updatedAt;

        return plain;
    }

    // ----------------------
    // LIST ALL
    // ----------------------
    static async listAll() {
        const aulas = await Aula.findAll({
            include: [
                {
                    model: Modulo,
                    as: 'modulo',
                    include: [
                        {
                            model: Curso,
                            as: 'curso',
                        }
                    ]
                }
            ]
        });

        return aulas
            .map(a => {
                const plain = a.get({ plain: true });
                delete plain.createdAt;
                delete plain.updatedAt;

                if (plain.modulo) {
                    delete plain.modulo.createdAt;
                    delete plain.modulo.updatedAt;

                    if (plain.modulo.curso) {
                        delete plain.modulo.curso.createdAt;
                        delete plain.modulo.curso.updatedAt;
                    }
                }

                return plain;
            });
    }

    // ----------------------
    // GET BY ID
    // ----------------------
    static async getById(id) {
        const aula = await Aula.findByPk(id, {
            include: [
                {
                    model: Modulo,
                    as: 'modulo',
                    include: [{ model: Curso, as: 'curso' }]
                }
            ]
        });

        if (!aula) {
            throw new Error("Aula não encontrada.");
        }

        const plain = aula.get({ plain: true });

        delete plain.createdAt;
        delete plain.updatedAt;

        if (plain.modulo) {
            delete plain.modulo.createdAt;
            delete plain.modulo.updatedAt;

            if (plain.modulo.curso) {
                delete plain.modulo.curso.createdAt;
                delete plain.modulo.curso.updatedAt;
            }
        }

        return plain;
    }

    // ----------------------
    // UPDATE
    // ----------------------
    static async update(id, aulaData) {
        const aula = await Aula.findByPk(id, {
            include: [
                {
                    model: Modulo,
                    as: 'modulo',
                    include: [{ model: Curso, as: 'curso' }]
                }
            ]
        });

        if (!aula) {
            throw new Error("Aula não encontrada.");
        }

        if (aulaData.moduloId && aulaData.moduloId !== aula.moduloId) {
            const novoModulo = await Modulo.findByPk(aulaData.moduloId, {
                include: [{ model: Curso, as: 'curso' }]
            });

            if (!novoModulo) throw new Error("Novo módulo não encontrado.");

            if (novoModulo.curso.professorId !== userId)
                throw new Error("Você não pode mover a aula para um módulo de outro instrutor.");
        }

        await aula.update(aulaData);

        const plain = aula.get({ plain: true });

        delete plain.createdAt;
        delete plain.updatedAt;

        return plain;
    }

    // ----------------------
    // DELETE
    // ----------------------
    static async delete(id) {
        const aula = await Aula.findByPk(id, {
            include: [
                {
                    model: Modulo,
                    as: 'modulo',
                    include: [{ model: Curso, as: 'curso' }]
                }
            ]
        });

        if (!aula) {
            return false;
        }

        await aula.destroy();
        return true;
    }
}

module.exports = AulaService;
