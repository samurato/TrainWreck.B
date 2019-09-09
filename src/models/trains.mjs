import mongoose from 'mongoose';

export const ControlSignals = {
  STOP: 'stop',
  ACCELERATING: 'accelerating'
}


const trainsSchema = mongoose.Schema({
  'id'                : String,
  'number_carriages'  : Number,
  'route_id'          : String,
  'weather'           : String,
  'headlights'        : Boolean,
  'youtubeId'         : String
});

// {id: "12345678", number_carriages : 10, route_id: "green", weather: "sunny", headlights: true, youtubeId: "asksd123" }

export default mongoose.model('Trains', trainsSchema);
