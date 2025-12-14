const Matricula = require('../models/matricula');
const Curso = require('../models/curso');
const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const { Op } = require('sequelize');

class MatriculaService {

  // ----------------------
  // CREATE
  // ----------------------
  static async create({ alunoId, cursoId }) {

    const user = await User.findByPk(alunoId, {
      include: [{ model: UserProfile, as: 'userProfile' }],
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (!user.userProfile || user.userProfile.perfil !== 'aluno') {
      throw new Error('Somente alunos podem se matricular.');
    }

    const curso = await Curso.findByPk(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado.');
    }

    const exists = await Matricula.findOne({
      where: { alunoId, cursoId },
    });

    if (exists) {
      throw new Error('Você já está matriculado neste curso.');
    }

    const matricula = await Matricula.create({ alunoId, cursoId });

    const plain = matricula.get({ plain: true });
    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  }

  // ----------------------
  // LIST ALL
  // ----------------------
  static async listAll() {
    const matriculas = await Matricula.findAll({
      include: [
        { model: User, as: 'aluno' },
        { model: Curso, as: 'curso' },
      ],
    });

    return matriculas.map(m => {
      const plain = m.get({ plain: true });

      delete plain.createdAt;
      delete plain.updatedAt;

      if (plain.aluno) {
        delete plain.aluno.createdAt;
        delete plain.aluno.updatedAt;
      }

      if (plain.curso) {
        delete plain.curso.createdAt;
        delete plain.curso.updatedAt;
      }

      return plain;
    });
  }

  // ----------------------
  // GET BY ID
  // ----------------------
  static async getById(id) {
    const matricula = await Matricula.findByPk(id, {
      include: [
        { model: User, as: 'aluno' },
        { model: Curso, as: 'curso' },
      ],
    });

    if (!matricula) {
      throw new Error('Matrícula não encontrada.');
    }

    const plain = matricula.get({ plain: true });
    delete plain.createdAt;
    delete plain.updatedAt;

    if (plain.aluno) {
      delete plain.aluno.createdAt;
      delete plain.aluno.updatedAt;
    }

    if (plain.curso) {
      delete plain.curso.createdAt;
      delete plain.curso.updatedAt;
    }

    return plain;
  }

  // ----------------------
  // LIST BY ALUNO
  // ----------------------
  static async listByAluno(alunoId) {
    const matriculas = await Matricula.findAll({
      where: { alunoId },
      include: [{ model: Curso, as: 'curso' }],
    });

    return matriculas.map(m => {
      const plain = m.get({ plain: true });
      delete plain.createdAt;
      delete plain.updatedAt;

      if (plain.curso) {
        delete plain.curso.createdAt;
        delete plain.curso.updatedAt;
      }

      return plain;
    });
  }

  // ----------------------
  // UPDATE
  // ----------------------
  static async update(id, { cursoId }) {

    const matricula = await Matricula.findByPk(id);
    if (!matricula) {
      throw new Error('Matrícula não encontrada.');
    }

    if (cursoId && cursoId !== matricula.cursoId) {

      const curso = await Curso.findByPk(cursoId);
      if (!curso) {
        throw new Error('Novo curso não encontrado.');
      }

      const exists = await Matricula.findOne({
        where: {
          alunoId: matricula.alunoId,
          cursoId,
          id: { [Op.ne]: id },
        },
      });

      if (exists) {
        throw new Error('Aluno já está matriculado neste curso.');
      }

      matricula.cursoId = cursoId;
    }

    await matricula.save();

    const plain = matricula.get({ plain: true });
    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  }

  // ----------------------
  // DELETE
  // ----------------------
  static async delete(id) {
    const matricula = await Matricula.findByPk(id);
    if (!matricula) return false;

    await matricula.destroy();
    return true;
  }
}

module.exports = MatriculaService;
