import express from "express";
import Album from "../models/Album";
import {AlbumType, newAlbums, TrackType} from "../types";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Track from "../models/Track";

const convertAlbum = (albums:AlbumType[], tracks:TrackType[]) => {
  const newAlbums:newAlbums[] = [];

  albums.forEach((item) => {
    const filter = tracks.filter((id) => id.album && id.album.toString() === item._id.toString());

    const obj:newAlbums = {
      _id: item._id,
      album: {
        title: item.title,
        executor: item.executor,
        date: item.date,
        image: item.image || null,
      },
      counter: filter.length
    };

    newAlbums.push(obj);
  });

  return newAlbums;
};

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  const query = req.query.artist as string;

  try {
    if (req.query.artist !== undefined) {
      const albums = await Album.find({executor: query}).sort([['date', -1]]);
      const tracks = await Track.find();
      const newAlbums = convertAlbum(albums, tracks);

      return res.send(newAlbums);
    } else {
      const albums = await Album.find().sort([['date', -1]]);
      const tracks = await Track.find();
      const newAlbums = convertAlbum(albums, tracks);

      return res.send(newAlbums);
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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const album = await Album.create({
      title: req.body.title,
      executor: req.body.executor,
      date: req.body.date,
      image: req.file ? req.file.filename : null,
      isPublished: req.body.isPublished
    });

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