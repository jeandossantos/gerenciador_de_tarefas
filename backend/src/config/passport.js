const { authSecret } = require('../../.env')
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = app => {
    const opts = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
    
    const strategy = new Strategy(opts, (payload, done) => {
        app.connection('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, (user) ? { ...payload } : false))
            .catch(err => done(err, false))
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
