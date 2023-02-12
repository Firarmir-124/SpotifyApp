import express from 'express'
import mongoose from "mongoose";

const app = express();
const port = 8000;

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/spotify');

  app.listen(port, () => {
    console.log('Server ok: ', port)
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);