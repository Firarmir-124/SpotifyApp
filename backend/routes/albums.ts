import express from "express";
import Album from "../models/Album";
import {AlbumMutation, AlbumType, newAlbums, TrackType} from "../types";
import mongoose, {HydratedDocument} from "mongoose";
import {imagesUpload} from "../multer";
import Track from "../models/Track";
import auth, {RequestWitUser} from "../middleware/auth";
import authAnonymous from "../middleware/authAnonymous";
import permit from "../middleware/permit";

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
        isPublished: item.isPublished,
        user: item.user._id.toString()
      },
      counter: filter.length
    };

    newAlbums.push(obj);
  });

  return newAlbums;
};

const albumsRouter = express.Router();

albumsRouter.get('/', authAnonymous, async (req, res) => {
  const query = req.query.artist as string;
  const query2 = req.query.user as string;
  const user = (req as RequestWitUser).user;

  try {
    if (req.query.artist !== undefined) {
      const albums = user ? (
        user.role === 'admin' ? (
          await Album.find({executor: query}).sort([['date', -1]])
        ) : await Album.find({executor: query, isPublished: true}).sort([['date', -1]])
      ) : (
        await Album.find({executor: query, isPublished: true}).sort([['date', -1]])
      );

      const tracks = await Track.find();
      const newAlbums = convertAlbum(albums, tracks);

      return res.send(newAlbums);
    } else if (req.query.user !== undefined) {
      const albumsUser = await Album.find({user: query2, isPublished: false});
      return res.send(albumsUser);
    } else {
      const albums = user ? (
        user.role === 'admin' ? (
          await Album.find().sort([['date', -1]])
        ) : await Album.find({user: user.id}).sort([['date', -1]])
      ) : (
        await Album.find({isPublished: true}).sort([['date', -1]])
      );
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

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  try {
    const album = await Album.create({
      title: req.body.title,
      executor: req.body.executor,
      date: req.body.date,
      image: req.file ? req.file.filename : null,
      isPublished: req.body.isPublished,
      user: user._id
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album: HydratedDocument<AlbumMutation> | null = await Album.findOne({_id: req.params.id});

    if (!album) {
      return res.sendStatus(404);
    }

    album.isPublished ? album.isPublished = !req.body.isPublished : album.isPublished = req.body.isPublished;

    await album.save();
    return res.send(album.isPublished);
  } catch (e) {

    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }

  }
});

albumsRouter.delete('/:id', authAnonymous, async (req, res) => {
  const {id} = req.params;
  const user = (req as RequestWitUser).user;

  if (!user) {
    return res.sendStatus(403);
  }

  try {
    const album = await Album.findOne({_id: id});

    if (user.role === 'admin') {
      await Album.deleteOne({_id: id});
      return res.send('admin deletes: ' + id);
    } else if (user.role === 'user') {
      if (album) {
        if (album.isPublished === false) {

          if (album.user._id.toString() !== user._id.toString()) {
            return res.status(403).send({error: 'Данная сущность чужая, удалить нельзя !'});
          } else {
            await Album.deleteOne({_id: id});
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

export default albumsRouter;