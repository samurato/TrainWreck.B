import jwt from 'jsonwebtoken';
import {default as config} from '../config.mjs';

export const isAuthorised = (email, password) => {
    return true;
    //TODO check user in database and return true or false
};

export const makeToken = (token) => {
    return jwt.sign(
         {
             oldToken:token
         },
         config.JWT.SECRET,
         {expiresIn: config.JWT.TIMEOUT},
     );
 };

export const remakeToken = (email, password) => {
   return jwt.sign(
        { 
            email: email
        },
        config.JWT.SECRET,
        {expiresIn: config.JWT.TIMEOUT},
    );
};

export const verifyToken = (token) =>{
    jwt.verify(token, config.JWT.SECRET, function(err, decoded){
        return err;
    });
}