import express from "express";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  res.send('get');
});

tracksRouter.post('/', async (req, res) => {
  res.send('post');
});

export default tracksRouter