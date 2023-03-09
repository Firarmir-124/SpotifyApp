import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWitUser} from "../middleware/auth";
import authAnonymous from "../middleware/authAnonymous";


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

artistRouter.post('/', auth, imagesUpload.single('photo'), async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  try {
    const artist = await Artist.create({
      title: req.body.title,
      photo: req.file ? req.file.filename : null,
      information: req.body.information,
      isPublished: req.body.isPublished,
      user: user._id
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

artistRouter.delete('/:id', authAnonymous, async (req, res) => {
  const {id} = req.params;
  const user = (req as RequestWitUser).user;

  if (!user) {
    return res.sendStatus(403);
  }

  try {
    const artist = await Artist.findOne({_id: id});

    if (user.role === 'admin') {
      await Artist.deleteOne({_id: id});
      return res.send('admin deletes: ' + id);
    } else if (user.role === 'user') {
      if (artist) {
        if (artist.isPublished === false) {

          if (artist.user !== user._id.toString()) {
            return res.status(403).send({error: 'Данная сущность чужая, удалить нельзя !'});
          } else {
            await Artist.deleteOne({_id: id});
            return res.send('user deletes: ' + id)
          }

        } else {
          return res.status(403).send({error: 'Запрещено удаление'});
        }
      }
    }

  } catch (e) {
    return res.sendStatus(500);
  }

});

export default artistRouter;