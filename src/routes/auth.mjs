import express from 'express';
import checkAPIs from 'express-validator';
import * as AuthService from '../services/auth.mjs';
const { check, validationResult } = checkAPIs;

const router = express.Router();

router.get('/check', async (req, res) => {
    return res.send({error: 'Use POST'});
});


router.post('/', 
[
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], 
async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(422, {
            error: 'invalid username or password',
        });
    }    

    if (!AuthService.isAuthorised(req.body.email, req.body.password)) {
        return res.json(401, {
            error: 'not valid user',
        });
    }
    const token = AuthService.makeToken(req.body.email, req.body.password);
    
    return res.send({
        message: 'success', 
        // email: req.body.email, 
        // password: req.body.password,
        token: token
    });
});


router.post('/refresh', 
async (req, res) => {

    if(!AuthService.verifyToken(req.body.token)){
        return res.json(401, {
            error: 'invalid token',
        });
    }

    const token = AuthService.remakeToken(req.body.token);
    
    return res.send({
        message: 'success', 
        token: token
    });
});


export default router;