import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'Unauthorized'})
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'wrong token'})
  }

  const newHistory = {
    user,
    track: req.body.track,
    datetime: (new Date()).toISOString(),
  }

  const history = new TrackHistory(newHistory);

  try {
    await history.save();
    return res.send(history);

  }catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(404).send(e);
    } else {
      return next(e)
    }
  }
});

export default trackHistoryRouter;