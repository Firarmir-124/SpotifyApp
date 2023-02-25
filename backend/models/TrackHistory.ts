import {model, Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";
import {TrackHistory} from "../types";
import Artist from "./Artist";

const TrackHistorySchema = new Schema<TrackHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: (value: Types.ObjectId) => Track.findById(value),
      message: 'Track does not exist'
    }
  },
  executor: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: (value: Types.ObjectId) => Artist.findById(value),
      message: 'Artist does not exist'
    }
  },
  datetime: {
    type: String,
    required: true,
  }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory