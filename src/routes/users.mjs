import express from 'express';
import checkAPIs from 'express-validator';
import {default as Users} from '../models/users.mjs';
const { check, validationResult } = checkAPIs;

import * as UsersService from '../services/users.mjs';


const router = express.Router();

router.get('/check', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/',
async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/me',
async (req, res) => {
    return res.send({message: 'success'});
});

router.post('/create',
[
    check('name').exists(),
    check('email').isEmail(),
    check('password').custom(pw => UsersService.checkPassword(pw)),
    check('role').custom(role => UsersService.checkRole(role)),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return {
                    msg: err.msg,
                    param: err.param,
                };
            })
        });
    }
    try {
        await UsersService.createUser(req.body.name, req.body.email, req.body.password, req.body.role);
    } catch (e) {
        return res.status(500).json({
            error: `Failed to create user: ${e}`,
        });
    }
    

    return res.send({message: 'success'});
});

router.put('/password/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

router.put('/role/:id', async (req, res) => {
    return res.send({message: 'success'});
});

router.put('/name/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

router.delete('/remove/:id',
async (req, res) => {
    return res.send({message: 'success'});
});


router.post('/testmake',
async (req, res) => {
    try {
        await UsersService.createUser(req.body.name, req.body.email, req.body.password, req.body.role);
    } catch (e) {
        return res.json(401, {
            error: `Failed to create user: ${e}`,
        });
    }
    return res.send({message: 'success'});
});

export default router;