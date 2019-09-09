import jwt from 'jsonwebtoken';
import {default as config} from '../config.mjs';

export const isAuthorised = (email, password) => {
    return true;
    //TODO check user in database and return true or false
};

export const makeToken = (email, password) => {
   return jwt.sign(
        {
            name: 'Ben', 
            email: email
        },
        config.JWT.SECRET,
        {expiresIn: config.JWT.TIMEOUT},
    );
};