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
    ref: 'Album',
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Artist does not exist'
    }
  },
  duration: {
    type: String,
    required: true
  }
});

const Track = mongoose.model('Track', TrackSchema);

export default Track