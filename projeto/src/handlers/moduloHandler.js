const ModuloValidation = require("../utils/validations/moduloValidation");
const ModuloService = require("../services/moduloService");

class ModuloHandler {
    static async create(request, h) {
        const { error } = ModuloValidation.create().validate(request.payload);

        if (error) {
            return h
                .response({ message: error.details[0].message })
                .code(400);
        }

        try {
            const modulo = await ModuloService.create(request.payload);
            return h.response(modulo).code(201);

        } catch (err) {
            console.error(err);

            if (err.message === "Curso não encontrado") {
                return h.response({ message: err.message }).code(400);
            }

            return h.response({
                message: "Erro ao criar módulo"
            }).code(500);
        }
    }

    static async list(request, h) {
        try {
            const modulos = await ModuloService.listAll();
            return h.response(modulos).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: "Erro ao buscar módulos"
            }).code(500);
        }
    }

    static async get(request, h) {
        try {
            const { id } = request.params;
            const modulo = await ModuloService.getById(id);

            if (!modulo) {
                return h.response({
                    message: "Módulo não encontrado"
                }).code(404);
            }

            return h.response(modulo).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: "Erro ao buscar módulo"
            }).code(500);
        }
    }

    static async update(request, h) {
        const { id } = request.params;
        const moduloData = request.payload;

        try {
            const updated = await ModuloService.update(id, moduloData);

            if (!updated) {
                return h.response({
                    message: "Módulo não encontrado"
                }).code(404);
            }

            return h.response(updated).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: "Erro ao atualizar módulo"
            }).code(500);
        }
    }

    static async delete(request, h) {
        try {
            const { id } = request.params;

            const deleted = await ModuloService.delete(id);

            if (!deleted) {
                return h.response({
                    message: "Módulo não encontrado"
                }).code(404);
            }

            return h.response({
                message: "Módulo deletado com sucesso"
            }).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: "Erro ao deletar módulo"
            }).code(500);
        }
    }
}

module.exports = ModuloHandler;