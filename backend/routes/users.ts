import express from "express";
import User from "../models/User";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import * as crypto from "crypto";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully !', user});
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});


usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'User not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password not found'});
  }

  try {
    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password correct !', user});
  }catch (e) {
    return next(e)
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Wrong Google token !'});
    }

    const email = payload["email"];
    const googleId = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      return res.status(400).send({error: "Not enough user data"});
    }

    let user = await User.findOne({googleId});

    if (!user) {
      user = new User({
        username: email,
        displayName,
        googleId,
        avatar,
        password: crypto.randomUUID(),
      });
    }

    user.generateToken();
    await user.save();
    return res.send({message: 'login with Google successful!', user});
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/meta', async (req, res, next) => {
  try {
    const ticket = {
      email: req.body.email,
      name: req.body.name,
      picture: req.body.picture.data.url,
      id: req.body.id,
    };

    if (!ticket) {
      return res.status(400).send({error: "Not enough user data"});
    }

    let user = await User.findOne({metaId: ticket.id});

    if (!user) {
      user = new User({
        username: ticket.email,
        displayName: ticket.name,
        password: crypto.randomUUID(),
        metaId: ticket.id,
        avatar: ticket.picture,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({message: 'login with meta successful!', user});
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK'};

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;