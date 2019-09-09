import { default as Train } from '../models/trains.mjs';

export const getTrains = () => {
    return [];
}

export const getTrain = (id) => {
    // TODO get train from database?
    return new Train();
}