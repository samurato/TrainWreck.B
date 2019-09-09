import express from 'express';

const router = express.Router();

router.get('/check', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/:id', async (req, res) => {
    return res.send({message: 'success'});
});

export default router;