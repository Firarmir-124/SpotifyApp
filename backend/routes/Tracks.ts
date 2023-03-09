import express from "express";
import Track from "../models/Track";
import mongoose, {HydratedDocument} from "mongoose";
import auth, {RequestWitUser} from "../middleware/auth";
import authAnonymous from "../middleware/authAnonymous";
import permit from "../middleware/permit";
import {AlbumMutation} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', authAnonymous, async (req, res) => {
  const query = req.query.album as string;
  const user = (req as RequestWitUser).user;

  try {
    if (req.query.album !== undefined) {

      const tracksId = user ? (
        user.role === 'admin' ? (
          await Track.find({album: query}).sort([['trackNumber', +1]])
        ) : await Track.find({album: query}).sort([['trackNumber', +1]])
      ) : (
        await Track.find({album: query, isPublished: true}).sort([['trackNumber', +1]])
      );

      return res.send(tracksId);
    } else {
      const tracks = user ? (
        user.role === 'admin' ? (
          await Track.find().sort([['trackNumber', +1]])
        ) : await Track.find({user: user.id}).sort([['trackNumber', +1]])
      ) : (
        await Track.find({isPublished: true}).sort([['trackNumber', +1]])
      );

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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track: HydratedDocument<AlbumMutation> | null = await Track.findOne({_id: req.params.id});

    if (!track) {
      return res.sendStatus(404);
    }

    track.isPublished ? track.isPublished = !req.body.isPublished : track.isPublished = req.body.isPublished;

    await track.save();
    return res.send(track.isPublished);
  } catch (e) {

    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }

  }
});

tracksRouter.delete('/:id', authAnonymous, async (req, res) => {
  const {id} = req.params;
  const user = (req as RequestWitUser).user;

  if (!user) {
    return res.sendStatus(403);
  }

  try {
    const track = await Track.findOne({_id: id});

    if (user.role === 'admin') {
      await Track.deleteOne({_id: id});
      return res.send('admin deletes: ' + id);
    } else if (user.role === 'user') {
      if (track) {
        if (track.isPublished === false) {

          if (track.user._id.toString() !== user._id.toString()) {
            return res.status(403).send({error: 'Данная сущность чужая, удалить нельзя !'});
          } else {
            await Track.deleteOne({_id: id});
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

export default tracksRouter