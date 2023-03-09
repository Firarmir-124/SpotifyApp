import mongoose, {Types} from "mongoose";
import Album from "./Album";
import User from "./User";
import {TrackMutation} from "../types";

const Schema = mongoose.Schema;

const TrackSchema = new Schema<TrackMutation>({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  }
});

const Track = mongoose.model('Track', TrackSchema);

export default Track