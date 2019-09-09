import mongoose from 'mongoose';

const trainsSchema = mongoose.Schema({
  'id'        : String,
  'url'       : String
});

// {id: "12345678", number_carriages : 10, route_id: "green", weather: "sunny", headlights: true, youtubeId: "asksd123" }

export default mongoose.model('Trains', trainsSchema);
