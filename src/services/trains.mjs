// const TrainCollection  = require('../models/trains.mjs')
import { default as Train } from '../models/trains.mjs';

export const getTrains = () => {
    // TODO get train from database?
    Train.find({}, (err, trains) => {
        if (!!err) {
            console.log('failed to get trains list')
            throw new Error('Failed to get trains list', err);
        }
        return trains;
    });
    //return TrainCollection;
    //return [];
}

export const getTrain = (id) => {
    // TODO get train from database?
    Train.findOne({id:id}, (err, train) => {
        if (!!err) {
            console.log('failed to get train')
            throw new Error('Failed to get train', err);
        }
        return train;
    });

    return new Train();

    // TrainCollection.findOne({_id: id}, (err, message) => {
    //     if (err) {
    //         console.log('error')
            
    //     } else {
            
    //         if (req.user.local.username == message.name) {
    //             process.nextTick(() => {
    //                 Message.findByIdAndRemove(req.params.id, (err) => {
    //                     if (err) {
    //                         console.log('error')
    //                         res.redirect('/beemp')
    //                     }
    //                     res.redirect('/beemp')
    //                 })
    //         })} else {
    //             res.redirect('/beemp')
    //         }

    //     }
//})
}

