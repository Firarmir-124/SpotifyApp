import mongoose, {Types} from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'albums',
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Artist does not exist'
    }
  },
  duration: String
});

const Track = mongoose.model('tracks', TrackSchema);

export default Track