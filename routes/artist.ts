import express from "express";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  res.send('get')
});

artistRouter.post('/', async (req, res) => {
  res.send('post')
});

export default artistRouter;