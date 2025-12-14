const MatriculaService = require("../services/matriculaService");
const MatriculaValidation = require("../utils/validations/matriculaValidation");

class MatriculaHandler {
  // ----------------------
  // CREATE
  // ----------------------
  static async create(request, h) {
      console.log('payload:', request.payload);
      console.log('headers:', request.headers['content-type']);
    const { error } = MatriculaValidation.create().validate(request.payload);
    if (error) {
      return h.response({ message: error.details[0].message }).code(400);
    }

    const { alunoId, cursoId } = request.payload;

    try {
      const matricula = await MatriculaService.create({
        alunoId,
        cursoId
      });

      return h.response(matricula).code(201);

    } catch (err) {
      console.error(err);

      if (
        err.message === "Usuário não encontrado." ||
        err.message === "Curso não encontrado."
      ) {
        return h.response({ message: err.message }).code(404);
      }

      if (
        err.message === "Somente alunos podem se matricular." ||
        err.message === "Você já está matriculado neste curso."
      ) {
        return h.response({ message: err.message }).code(403);
      }

      return h.response({ message: "Erro ao criar matrícula" }).code(500);
    }
  }

  // ----------------------
  // LIST ALL
  // ----------------------
  static async list(request, h) {
    try {
      const matriculas = await MatriculaService.listAll();
      return h.response(matriculas).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Erro ao buscar matrículas" }).code(500);
    }
  }

  // ----------------------
  // GET BY ID
  // ----------------------
  static async get(request, h) {
    try {
      const { id } = request.params;
      const matricula = await MatriculaService.getById(id);

      return h.response(matricula).code(200);

    } catch (err) {
      console.error(err);

      if (err.message === "Matrícula não encontrada.") {
        return h.response({ message: err.message }).code(404);
      }

      return h.response({ message: "Erro ao buscar matrícula" }).code(500);
    }
  }

  // ----------------------
  // UPDATE
  // ----------------------
  static async update(request, h) {
    const { id } = request.params;

    const { error } = MatriculaValidation.update().validate(request.payload);
    if (error) {
      return h.response({ message: error.details[0].message }).code(400);
    }

    const { alunoId, cursoId } = request.payload;

    try {
      const updated = await MatriculaService.update(id, {
        alunoId,
        cursoId
      });

      return h.response(updated).code(200);

    } catch (err) {
      console.error(err);

      if (
        err.message === "Matrícula não encontrada." ||
        err.message === "Novo curso não encontrado."
      ) {
        return h.response({ message: err.message }).code(404);
      }

      if (err.message === "Aluno já está matriculado neste curso.") {
        return h.response({ message: err.message }).code(403);
      }

      return h.response({ message: "Erro ao atualizar matrícula" }).code(500);
    }
  }

  // ----------------------
  // DELETE
  // ----------------------
  static async delete(request, h) {
    try {
      const { id } = request.params;

      const deleted = await MatriculaService.delete(id);

      if (!deleted) {
        return h.response({ message: "Matrícula não encontrada" }).code(404);
      }

      return h.response({ message: "Matrícula deletada com sucesso" }).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Erro ao deletar matrícula" }).code(500);
    }
  }
}

module.exports = MatriculaHandler;
