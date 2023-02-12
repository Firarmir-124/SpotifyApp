import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtiSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: String,
  information: String,
});

const Artist = mongoose.model('artists', ArtiSchema);

export default Artist;