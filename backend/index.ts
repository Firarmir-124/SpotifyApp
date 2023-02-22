import express from 'express'
import mongoose from "mongoose";
import artistRouter from "./routes/artist";
import albumsRouter from "./routes/albums";
import tracksRouter from "./routes/Tracks";
import usersRouter from "./routes/users";
import trackHistoryRouter from "./routes/trackHistory";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/spotify');

  app.listen(port, () => {
    console.log('Server ok: ', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);