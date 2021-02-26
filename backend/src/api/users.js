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
            
            if(!user.id) {
                existsOrError(user.password, 'Senha é Obrigatório');
                equalsOrError(user.password, user.confirmPassword, 'Senha não Coincidem');

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

    const updatePassword = async (req, resp) => {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        
        try {
            equalsOrError(newPassword, confirmNewPassword, 'Senhas Não coincidem!');
            
            const user = await knex('users').where({ id: req.params.id }).first();
            console.log(req.user)
            const isMatch = bcrypt.compareSync(oldPassword, user.password);

            if(!isMatch) return resp.status(400).send('Senha do usuário incorreta!');
        } catch (msg) {
            return resp.status(400).send(msg);            
        }

        const password = encryptPassword(newPassword);

        knex('users')
        .update({ password: password })
        .where({ id: req.params.id })
        .then(_ => resp.status(204).send())
        .catch(_ => resp.status(500).send())

    }

    const remove = async (req, resp) => {
        const password = req.headers.userpassword;

            const user = await knex('users').where({ id: req.params.id }).first();
            const isMatch = bcrypt.compareSync(password, user.password);

            if(!isMatch) return resp.status(400).send('Senha do usuário incorreta!');
        
        knex('users')
            .where({ id: req.params.id })
            .del()
            .then(_ => resp.status(204).send())
            .catch(_ => resp.status(500).send())
    }
    
    return { save, updatePassword, remove }
}