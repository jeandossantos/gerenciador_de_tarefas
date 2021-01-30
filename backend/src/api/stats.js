module.exports = app => {

    const knex = app.connection;

    const stats = async (req, resp) => {
        const userId = req.user.id;
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const tasksTodayCount = await knex('tasks')
                                .where({ user_id: userId, done: false })
                                .where('deadline', '>=', `${today} ${date.getHours()}:${date.getMinutes()}`)
                                .where('deadline', '<=', `${today} 23:59:59`).count('id').first();
        const tasksFinished = await knex('tasks')
                                .where({ user_id: userId, done: true }).count('id').first();
        const tasksCount = await knex('tasks')
                                .where({ user_id: userId }).count('id').first();

        resp.json({
            tasksTodayCount: tasksTodayCount.count,
            tasksFinished: tasksFinished.count,
            tasksCount: tasksCount.count
        });
    }

    return {  stats }
}