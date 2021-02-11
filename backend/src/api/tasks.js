const { existsOrError } = require('./validation');

module.exports = app => {

    const knex = app.connection;

    const save = async (req, resp) => {
        const task = { 
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            done: req.body.done,
            deadline: req.body.deadline,
            user_id: req.user.id
        };

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
                        .where({ user_id: req.user.id })
                        .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
                        .count('id').first();
        
        knex('tasks')
            .where({ user_id: req.user.id })
            .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
            .limit(limit)
            .offset(page * limit - limit)
            .orderBy('deadline', 'DESC')
            .then(tasks => {
                tasks = tasks.sort((a, b) => {
                    if (a.done > b.done) return 1;
                    if (a.done < b.done) return -1;
                    return 0;
                })

                resp.json({ data: tasks, limit, count })
            })
            .catch(_ => resp.status(500).send())
    }

    const getDialyTasks = async (req, resp) => {
        const search = req.query.search || '';
        const page = req.query.page || 1;
        const limit = 4;
        const date = new Date().toISOString().substr(0, 10);

        const { count } = await knex('tasks')
                        .where({ user_id: req.user.id })
                        .whereBetween('deadline', [`${date} 00:00:00`, `${date} 23:59:59`])
                        .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
                        .count('id').first();
        
        knex('tasks')
            .where({ user_id: req.user.id })
            .whereBetween('deadline', [`${date} 00:00:00`, `${date} 23:59:59`])
            .whereRaw('LOWER(name) LIKE ?', `${search.toLowerCase()}%`)
            .limit(4)
            .offset(page * limit - limit)
            .orderBy('deadline', 'DESC')
            .then(tasks => {
                tasks = tasks.sort((a, b) => {
                    if (a.done > b.done) return 1;
                    if (a.done < b.done) return -1;
                    return 0;
                })

                return resp.json({ data: tasks, limit, count })
            })
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

    return { save, getAll, getDialyTasks, remove, finish }
}