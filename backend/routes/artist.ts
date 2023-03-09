import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";


const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  }catch {
    return res.sendStatus(500);
  }
});

artistRouter.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findOne({_id: req.params.id});
    return res.send(artist);
  }catch {
    return res.sendStatus(500);
  }
});

artistRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
  try {
    const artist = await Artist.create({
      title: req.body.title,
      photo: req.file ? req.file.filename : null,
      information: req.body.information,
      isPublished: req.body.isPublished
    });

    return res.send(artist);
  }catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default artistRouter;