const { existsOrError, notExistsOrError, equalsOrError } = require('./validation');

module.exports = app => {

    const knex = app.connection;

    const save = async (req, resp) => {
        const task = { ...req.body };

        task.user_id = req.user.id;

        if(req.params.id) task.id = req.params.id;

        try {
            existsOrError(task.name, 'Nome é Obrigatório');
            existsOrError(task.deadline, 'Prazo é Obrigatório');            
        } catch (msg) {
            return resp.status(400).send(msg);
        }

        if(task.id) {
            knex('tasks')
                .update(task)
                .where({ id: task.id })
                .then(_ => resp.status(204).send())
                .catch(_ => resp.status(500).send())
        } else {
            knex('tasks')
                .insert(task)
                .then(_ => resp.status(201).send())
                .catch(_ => resp.status(500).send())
            }
    }

    const getAll = async (req, resp) => {
        const search = req.query.search || '';
        const page = req.query.page || 1;
        const limit = 4;
        const { count } = await knex('tasks')
                        .where({ user_id: req.user.id, done: false })
                        .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
                        .count('id').first();
        
        knex('tasks')
            .where({ user_id: req.user.id, done: false })
            .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
            .limit(4)
            .offset(page * limit - limit)
            .orderBy('deadline', 'ASC')
            .then(tasks => resp.json({ data: tasks, limit, count }))
            .catch(_ => resp.status(500).send())
    }

    const remove = (req, resp) => {
        knex('tasks')
            .where({ id: req.params.id })
            .del()
            .then(_ => resp.status(204).send())
            .catch(_ => resp.status(500).send())
    }

    const finish = (req, resp) => {
        knex('tasks')
            .update({ done: true })
            .where({ id: req.params.id })
            .then(_ => resp.status(204).send())
            .catch(_ => resp.status(500).send())
    }

    return { save, getAll, remove, finish }
}