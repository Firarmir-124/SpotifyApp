import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const ArtiSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: String,
  information: String,
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

const Artist = mongoose.model('Artist', ArtiSchema);

export default Artist;