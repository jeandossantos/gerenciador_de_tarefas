const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const { authSecret } = require('../../.env');

module.exports = app => {

    const login = async (req, resp) => {
        const data = { ...req.body };

        if(!data.email || !data.password) return resp.status(400).send('Informe E-mail e senha');

        const user = await app.connection('users').where({ email: data.email }).first();

        if(!user) return resp.status(400).send('Usuário não encontrado');

        const isMatch = bcrypt.compareSync(data.password, user.password);

        if(!isMatch) return resp.status(400).send('Usuário/Senha inválidos');

        const payload = {
            id: user.id,
            name: user.name,
            initiais: user.initiais,
            email: user.email,
            admin: user.admin
        };

        return resp.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        });
    }

    const validateToken = async (req, resp) => {
        const data = req.body || null;
        console.log(req.body)
        try {
            const payload = jwt.decode(data.token, authSecret);

            const userFromDB = await app.connection('users').where({ id: payload.id, email: payload.email }).first();
            console.log(userFromDB)
            if(!userFromDB) resp.status(401).send(false);

            return resp.send(true);
        } catch (msg) {
            console.log(msg)
        }
        return resp.status(401).send(false)
    }

    return { login, validateToken }
}