
module.exports = app => {

    const userApi = app.src.api.users;
    const taskApi = app.src.api.tasks;
    const authApi = app.src.api.auth;
    const passport = app.src.config.passport;

    app.post('/login', authApi.login);
    app.post('/signup', userApi.save);
    app.post('/validatetoken', authApi.validateToken);

    app.route('/users')
        .all(passport.authenticate())
        .put(userApi.save)
        
    app.route('/users/:id')
        .all(passport.authenticate())
        .delete(userApi.softDelete)


    app.route('/tasks')
        .all(passport.authenticate())
        .post(taskApi.save)
        .get(taskApi.getAll)
    
    app.route('/tasks/:id')
        .all(passport.authenticate())
        .put(taskApi.save)
        .delete(taskApi.remove)
    
    app.route('/tasks/finish/:id')
        .all(passport.authenticate())
        .post(taskApi.finish)

    app.route('/stats')
        .all(passport.authenticate())
        .get(app.src.api.stats.stats)
}