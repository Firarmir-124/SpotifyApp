import express from "express";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";
import auth, {RequestWitUser} from "../middleware/auth";
import Track from "../models/Track";
import {TrackPopulate} from "../types";

const trackHistoryRouter = express.Router();


trackHistoryRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  try {
    const executorId:TrackPopulate | null = await Track.findOne({_id: req.body.track}).populate('album');

    const newHistory = {
      user: user._id,
      track: req.body.track,
      executor: executorId && executorId.album.executor,
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
  }catch {
    return res.sendStatus(500);
  }
});

export default trackHistoryRouter;