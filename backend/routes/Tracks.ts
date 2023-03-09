import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWitUser} from "../middleware/auth";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  const query = req.query.album as string;

  try {
    if (req.query.album !== undefined) {
      const tracksId = await Track.find({album: query}).sort([['trackNumber', +1]]);
      return res.send(tracksId);
    } else {
      const tracks = await Track.find().sort([['trackNumber', +1]]);
      return res.send(tracks);
    }

  }catch (e) {
    return res.sendStatus(500);
  }
});

tracksRouter.post('/', auth,  async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  try {
     const track = await Track.create({
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      youtubeLink: req.body.youtubeLink.replace(/https:\/\/youtu.be\//gmi, ''),
      trackNumber: req.body.trackNumber,
      isPublished: req.body.isPublished,
      user: user._id
    });

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksRouter