const bcrypt = require('bcrypt');
const { existsOrError, notExistsOrError, equalsOrError } = require('./validation');

module.exports = app => {

    const knex = app.connection;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }

    const save = async (req, resp) => {
        const user = { ...req.body };

        if(!req.originalUrl.startsWith('/users') 
            || !req.user 
            || !req.user.admin) user.admin = false;

        const tarefaDefault = {
            name: 'Primeiro Login',
            description: 'Está é uma tarefa criada por padrão pelo sistema.',
            priority: 0,
            deadline: new Date(),
            done: true
        };

        if(req.params.id) user.id = req.params.id;

        try {
            existsOrError(user.name, 'Nome é Obrigatório');
            existsOrError(user.initiais, 'Iniciais é Obrigatório');
            existsOrError(user.email, 'E-mail é Obrigatório');
            existsOrError(user.password, 'Senha é Obrigatório');
            equalsOrError(user.password, user.confirmPassword, 'Senha não Coincidem');

            if(!user.id) {
                const userFromDB = await knex('users').where({ email: user.email }).first();
                
                notExistsOrError(userFromDB, 'Usuário já Cadastrado');
            }
            
        } catch (msg) {
            return resp.status(400).send(msg);
        }

        delete user.confirmPassword;

        if(user.id) {
            delete user.password;

            knex('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => resp.status(204).send())
                .catch(_ => resp.status(500).send())
        } else {
            user.password = encryptPassword(user.password);

            knex.transaction(function(trx) {
                knex('users')
                    .returning('id')
                    .insert(user)
                    .transacting(trx)
                    .then(resp => {
                        tarefaDefault.user_id = resp[0];

                        return knex('tasks').insert(tarefaDefault).transacting(trx);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
            .then(_ => resp.status(201).send())
            .catch(_ => resp.status(500).send())
        }
    }

    const getAll = (req, resp) => {
        knex('users')
            .select('id', 'name', 'initiais', 'email', 'createdAt', 'updateAt')
            .then(users => resp.json(users))
            .catch(_ => resp.status(500).send())
    }

    const softDelete = (req, resp) => {
        knex('users')
            .update({ deletedAt: new Date() })
            .then(_ => resp.status(204).send())
            .catch(_ => resp.status(500).send())
    }

    const remove = (req, resp) => {
        knex('users')
            .where({ id: req.params.id })
            .del()
            .then(_ => resp.status(204).send())
            .catch(_ => resp.status(500).send())
    }

    return { save, getAll, softDelete, remove }
}