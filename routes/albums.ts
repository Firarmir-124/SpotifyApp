import express from "express";
import Album from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  const query = req.query.artist as string;

  try {
    const albums = await Album.find().populate('executor');

    if (req.query.artist !== undefined) {
      const albums = await Album.find({executor: query});
      return res.send(albums);
    } else {
      return res.send(albums);
    }
  }catch {
    return res.sendStatus(500)
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('executor');
    return res.send(album)
  }catch {
    return res.send(500)
  }
});

albumsRouter.post('/',async (req, res, next) => {
  res.send('post');
});

export default albumsRouter;