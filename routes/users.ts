import express from "express";
import User from "../models/User";
import {Error} from "mongoose";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e)
    } else {
      return next(e)
    }
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(404).send({error: 'User not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(404).send({error: 'Password not found'});
  }

  return res.send({message: 'Username and password correct !'})
})

export default usersRouter;