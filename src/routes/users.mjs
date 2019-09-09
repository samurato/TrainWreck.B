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

router.get('/create',
[
    check('name').exists(),
    check('email').isEmail(),
    check('password').custom(pw => UsersService.checkPassword(pw)),
    check('role').custom(role => UsersService.checkRole(role)),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(422, {
            error: errors.array(true).msg
        });
    }
    return res.send({message: 'success'});
});

router.get('/password/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/role/:id', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/name/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/remove/:id',
async (req, res) => {
    return res.send({message: 'success'});
});

export default router;