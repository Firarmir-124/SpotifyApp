import mongoose, {Types} from "mongoose";
import Album from "./Album";
import User from "./User";

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
  youtubeLink: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: String,
    ref: Schema.Types.ObjectId,
    validate: {
      validator: (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  }
});

const Track = mongoose.model('Track', TrackSchema);

export default Track