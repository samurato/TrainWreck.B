import jwt from 'jsonwebtoken';
import {default as config} from '../config.mjs';

export default (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer laksjdflaksdjasdfklj'

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, config.JWT.SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        next();
    });
};