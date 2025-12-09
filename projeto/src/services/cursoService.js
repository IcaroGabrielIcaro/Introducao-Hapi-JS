const Curso = require("../models/curso");
const User = require("../models/User");
const UserProfile = require("../models/userProfile");

class CursoService {
    static async create(cursoData) {
        const { professorId } = cursoData;

        const professor = await User.findByPk(professorId, {
            include: [
                {
                    model: UserProfile,
                    as: 'userProfile',
                }
            ]
        });

        if (!professor) {
            throw new Error("Professor não encontrado");
        }

        if (!professor.userProfile || professor.userProfile.perfil !== 'professor') {
            throw new Error('O usuário informado não é um professor.');
        }

        const curso = await Curso.create(cursoData);

        const cursoPlain = curso.get({ plain: true });

        delete cursoPlain.createdAt;
        delete cursoPlain.updatedAt;

        return cursoPlain;
    }

    static async listAll() {
        const cursos = await Curso.findAll({
            include: [
                {
                    model: User,
                    as: 'professor',
                    include: [{ model: UserProfile, as: 'userProfile' }]
                }
            ]
        });

        return cursos.map(curso => {
            const plain = curso.get({ plain: true });
            delete plain.createdAt;
            delete plain.updatedAt;
            return plain;
        });
    }

    static async getById(id) {
        const curso = await Curso.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'professor',
                    include: [{ model: UserProfile, as: 'userProfile' }]
                }
            ]
        });

        if (!curso) {
            throw new Error('Curso não encontrado.');
        }

        const plain = curso.get({ plain: true });
        delete plain.createdAt;
        delete plain.updatedAt;

        return plain;
    }

    static async update(id, cursoData) {
        const curso = await Curso.findByPk(id);

        if (!curso) return null;

        await curso.update(cursoData);

        const cursoPlain = curso.get({ plain: true });

        delete cursoPlain.createdAt;
        delete cursoPlain.updatedAt;

        return cursoPlain;
    }

    static async delete(id) {
        const curso = await Curso.findByPk(id);

        if (!curso) return false;

        await curso.destroy();

        return true;
    }
}

module.exports = CursoService;