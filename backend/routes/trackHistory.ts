import express from "express";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";
import auth, {RequestWitUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  const newHistory = {
    user: user._id,
    track: req.body.track,
    datetime: (new Date()).toISOString(),
  };

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