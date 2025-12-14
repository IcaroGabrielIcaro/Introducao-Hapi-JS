const AulaService = require("../services/aulaService");
const AulaValidation = require("../utils/validations/aulaValidation");

class AulaHandler {
    // ----------------------
    // CREATE
    // ----------------------
    static async create(request, h) {
        const { error } = AulaValidation.create().validate(request.payload);
        if (error) {
            return h.response({ message: error.details[0].message }).code(400);
        }

        try {

            const aula = await AulaService.create(request.payload);

            return h.response(aula).code(201);

        } catch (err) {
            console.error(err);

            if (
                err.message === "Módulo não encontrado." ||
                err.message === "Módulo não está associado a um curso." ||
                err.message === "Você não pode criar aulas em cursos que não são seus."
            ) {
                return h.response({ message: err.message }).code(403);
            }

            return h.response({
                message: "Erro ao criar aula"
            }).code(500);
        }
    }

    // ----------------------
    // LIST ALL
    // ----------------------
    static async list(request, h) {
        try {
            const aulas = await AulaService.listAll();

            return h.response(aulas).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: "Erro ao buscar aulas"
            }).code(500);
        }
    }

    // ----------------------
    // GET BY ID
    // ----------------------
    static async get(request, h) {
        try {
            const { id } = request.params;

            const aula = await AulaService.getById(id);

            return h.response(aula).code(200);

        } catch (err) {
            console.error(err);

            if (err.message === "Aula não encontrada.") {
                return h.response({ message: err.message }).code(404);
            }

            return h.response({
                message: "Erro ao buscar aula"
            }).code(500);
        }
    }

    // ----------------------
    // UPDATE
    // ----------------------
    static async update(request, h) {
        const { id } = request.params;

        const { error } = AulaValidation.update().validate(request.payload);
        if (error) {
            return h.response({ message: error.details[0].message }).code(400);
        }

        try {

            const updatedAula = await AulaService.update(id, request.payload);

            return h.response(updatedAula).code(200);

        } catch (err) {
            console.error(err);

            if (err.message === "Aula não encontrada.") {
                return h.response({ message: err.message }).code(404);
            }

            return h.response({
                message: "Erro ao atualizar aula"
            }).code(500);
        }
    }

    // ----------------------
    // DELETE
    // ----------------------
    static async delete(request, h) {
        try {
            const { id } = request.params;

            const deleted = await AulaService.delete(id);

            if (!deleted) {
                return h.response({
                    message: "Aula não encontrada"
                }).code(404);
            }

            return h.response({
                message: "Aula deletada com sucesso"
            }).code(200);

        } catch (err) {
            console.error(err);

            return h.response({
                message: "Erro ao deletar aula"
            }).code(500);
        }
    }
}

module.exports = AulaHandler;
