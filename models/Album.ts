import mongoose, {Types} from "mongoose";
import Artist from "./Artist";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  executor: {
    type: Schema.Types.ObjectId,
    ref: 'artists',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: 'Artist does not exist'
    }
  },
  date: {
    type: String,
    required: true,
  },
  image: String
});

const Album = mongoose.model('albums', AlbumSchema);

export default Album