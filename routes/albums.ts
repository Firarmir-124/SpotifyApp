import express from "express";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  res.send('get');
});

albumsRouter.get('/:id', async (req, res) => {
  res.send('get id');
});

albumsRouter.post('/', async (req, res) => {
  res.send('post');
});

export default albumsRouter;