import express from "express";
import Track from "../models/Track";
import {TrackMutation} from "../types";
import mongoose from "mongoose";


const tracksRouter = express.Router();
let counter = 1;

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

tracksRouter.post('/', async (req, res, next) => {
  const newTrack:TrackMutation = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
    trackNumber: counter++,
  };

  const track = new Track(newTrack);

  try {
    await track.save();
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