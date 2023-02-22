import express from "express";
import Track from "../models/Track";
import {TrackMutation} from "../types";
import mongoose from "mongoose";


const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  const query = req.query.album as string;

  try {
    const tracks = await Track.find();

    if (req.query.album !== undefined) {
      const tracksId = await Track.find({album: query});
      return res.send(tracksId);
    } else {
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