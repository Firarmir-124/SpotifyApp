import express from "express";
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  const query = req.query.artist as string;

  try {
    const albums = await Album.find();

    if (req.query.artist !== undefined) {
      const albums = await Album.find({executor: query});
      return res.send(albums);
    } else {
      return res.send(albums);
    }
  }catch {
    return res.sendStatus(500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('executor');
    return res.send(album);
  }catch {
    return res.send(500);
  }
});

albumsRouter.post('/',imagesUpload.single('image'), async (req, res, next) => {
  const newAlbum:AlbumMutation = {
    title: req.body.title,
    executor: req.body.executor,
    date: req.body.date,
    image: req.file ? req.file.filename : null
  };

  const album = new Album(newAlbum);

  try {
    await album.save();
    return res.send(album);
  }catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return  res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default albumsRouter;