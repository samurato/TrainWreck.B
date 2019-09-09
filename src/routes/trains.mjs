import express from 'express';

const router = express.Router();
//check('email').isEmail(),
// router.get('/check', 
// [
//     check('name').custom((o) => o.length >= 8),
// ],
// async (req, res) => {
//     return res.send({message: 'success'});
// });

router.get('/', async (req, res) => {
    return res.send({message: 'success'});
});

router.get('/:id', async (req, res) => {
    return res.send({message: 'success'});
});

export default router;