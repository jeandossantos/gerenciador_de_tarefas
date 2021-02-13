module.exports = app => {

    const knex = app.connection;

    const stats = async (req, resp) => {
        const userId = req.user.id;
        const date = new Date().getTime();

        const uncompletedTasks = await knex('tasks').where({ user_id: userId, done: false });
        
        const expiredTasksCount = uncompletedTasks.filter(task => new Date(task.deadline).getTime() < date);
        
        const finishedTasksCount = await knex('tasks').where({ user_id: userId, done: true }).count('id').first();

        const totaltasksCount = await knex('tasks').where({ user_id: userId }).count('id').first();

        resp.json({
            finishedTasksCount: finishedTasksCount.count,
            expiredTasksCount: (expiredTasksCount.length).toString(),
            totaltasksCount: totaltasksCount.count
        });
    }

    return {  stats }
}