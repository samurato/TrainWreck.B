import express from 'express';
//import {default as Trains} from '../models/trains.mjs';
import * as TrainsService from '../services/trains.mjs';



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
    //return TrainsService.getTrains();
    return res.send(TrainsService.getTrains());
});

router.get('/:id', async (req, res) => {
    return res.send({message: 'success'});
    //return res.send(TrainsService.getTrain(id));
});

export default router;