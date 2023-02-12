import express from "express";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  const query = req.query.album as string;

  try {
    const tracks = await Track.find().populate('album');

    if (req.query.album !== undefined) {
      const tracksId = await Track.find({album: query}).populate('album');
      return res.send(tracksId);
    } else {
      return res.send(tracks);
    }
  }catch (e) {
    return res.sendStatus(500)
  }
});

tracksRouter.post('/', async (req, res) => {
  res.send('post');
});

export default tracksRouter