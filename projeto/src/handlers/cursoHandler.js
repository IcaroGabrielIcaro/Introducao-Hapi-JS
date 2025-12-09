const CursoService = require("../services/cursoService");
const CursoValidation = require("../utils/validations/cursoValidation");

class CursoHandler {
    static async create(request, h) {
        const { error } = CursoValidation.create().validate(request.payload);
        if (error) {
            return h
                .response({ message: error.details[0].message })
                .code(400);
        }

        try {
            const curso = await CursoService.create(request.payload);
            return h.response(curso).code(201);
        } catch (err) {
            console.error(err);

            if (
                err.message === 'Professor não encontrado.' ||
                err.message === 'O usuário informado não é um professor.'
            ) {
                return h.response({ message: err.message }).code(400);
            }

            return h.response({
                message: 'Erro ao criar curso'
            }).code(500);
        }
    }

    static async list(request, h) {
        try {
            const cursos = await CursoService.listAll();
            return h.response(cursos).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: 'Erro ao buscar cursos'
            }).code(500);
        }
    }

    static async get(request, h) {
        try {
            const { id } = request.params;
            const curso = await CursoService.getById(id);

            if (!curso) {
                return h.response({
                    message: 'Curso não encontrado'
                }).code(404);
            }

            return h.response(curso).code(200);

        } catch (err) {
            console.error(err);

            return h.response({
                message: 'Erro ao buscar curso'
            }).code(500);
        }
    }

    static async update(request, h) {
        const { id } = request.params;
        const cursoData = request.payload;

        try {
            const updatedCurso = await CursoService.update(id, cursoData);

            if (!updatedCurso) {
                return h.response({
                    message: 'Curso não encontrado'
                }).code(404);
            }

            return h.response(updatedCurso).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: 'Erro ao atualizar curso'
            }).code(500);
        }
    }

    static async delete(request, h) {
        try {
            const { id } = request.params;

            const deleted = await CursoService.delete(id);

            if (!deleted) {
                return h.response({
                    message: 'Curso não encontrado'
                }).code(404);
            }

            return h.response({
                message: 'Curso deletado com sucesso'
            }).code(200);

        } catch (err) {
            console.error(err);
            return h.response({
                message: 'Erro ao deletar curso'
            }).code(500);
        }
    }
}

module.exports = CursoHandler;