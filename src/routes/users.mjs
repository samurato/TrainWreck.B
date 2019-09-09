import express from 'express';
import checkAPIs from 'express-validator';
const { check, validationResult } = checkAPIs;

const router = express.Router();

router.get('/check', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    }    
    return res.send({message: 'success'});
});

router.get('/:id', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/me', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/create', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/password/:id', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/role/:id', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/name/:id', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

router.get('/remove/:id', async (req, res) => {
    const errors = validationResult(req);
    return res.send({message: 'success'});
});

export default router;